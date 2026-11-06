#!/usr/bin/env python3
"""DESIGN.md 1.0 토큰 규칙 검사.

색·글자·간격·모서리·모션·레이어 값을 토큰 없이 직접 쓴 곳을 찾아 파일:줄로 알려 준다.
width/height/top/left 같은 크기·위치(구조와 기하)는 px를 허용한다.

  python3 scripts/check-tokens.py            # 저장소 전체
  python3 scripts/check-tokens.py ad.html    # 파일 지정

예외로 남길 줄에는 이유와 함께 `/* token-ok: 이유 */`를 붙인다.
위반이 있으면 종료 코드 1.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SPACING_PROPS = re.compile(r'^(padding|margin)(-[a-z-]+)?$|^(row-|column-)?gap$')
COLOR = re.compile(r'#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(')
PX = re.compile(r'(?<![\w.-])(-?\d+(?:\.\d+)?)px')
DURATION = re.compile(r'(?<![\w.-])\d*\.?\d+m?s\b')
DECL = re.compile(r'(?<![\w-])([a-z-]+)\s*:\s*([^;{}]+)')


def check_decl(prop, val):
    """Return a reason string if the declaration breaks a token rule."""
    bare = re.sub(r'var\([^)]*\)', '', val)  # 토큰 참조를 지운 나머지만 본다
    if COLOR.search(bare):
        return '색은 --bg-/--text-/--border-/--icon- 토큰으로'
    if prop in ('font-size', 'line-height') and PX.search(bare):
        return '글자 크기·행간은 --text-*-size / --text-*-leading으로'
    if prop == 'font-weight' and re.search(r'\b[1-9]00\b', bare):
        return '굵기는 --font-weight-*로'
    if SPACING_PROPS.match(prop):
        bad = [m.group(1) for m in PX.finditer(bare) if m.group(1) not in ('0', '1', '-1')]
        if bad:
            return f'간격 {", ".join(b + "px" for b in bad)} → --spacing-*로'
    if prop.startswith('border') and 'radius' in prop and PX.search(bare):
        return '모서리는 --radius-*로'
    if prop == 'z-index' and re.fullmatch(r'\s*\d+\s*', bare) and int(bare) > 2:
        return '레이어는 --z-*로'
    if prop in ('transition', 'animation', 'transition-duration', 'animation-duration') and DURATION.search(bare):
        return '시간은 --duration-*로'
    return None


def strip_comments(text):
    return re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)) if 'token-ok' not in m.group(0)
                  else m.group(0), text, flags=re.S)


def scan_css(text, start_line, label, out):
    lines = text.split('\n')
    in_root_defs = False
    for i, raw in enumerate(lines):
        n = start_line + i
        if 'token-ok' in raw:
            continue
        line = re.sub(r'/\*.*?\*/', '', raw)
        # :root 블록 안의 토큰 정의는 원래 값을 쓰는 자리
        if re.search(r'(^|\s):root\s*\{', line):
            in_root_defs = '}' not in line.split('{', 1)[1]
            continue
        if in_root_defs:
            if '}' in line:
                in_root_defs = False
            continue
        if line.lstrip().startswith('@'):
            line = line.split('{', 1)[1] if '{' in line else ''
        for m in DECL.finditer(line):
            prop, val = m.group(1).lower(), m.group(2).strip()
            if prop.startswith('--'):
                continue
            reason = check_decl(prop, val)
            if reason:
                out.append(f'{label}:{n}: {prop}:{val[:60]}  — {reason}')


def scan_file(path, out):
    text = path.read_text(encoding='utf-8')
    rel = path.relative_to(ROOT)
    if path.suffix == '.css':
        scan_css(text, 1, rel, out)
        return
    for m in re.finditer(r'<style[^>]*>(.*?)</style>', text, flags=re.S):
        scan_css(m.group(1), text.count('\n', 0, m.start(1)) + 1, rel, out)
    for m in re.finditer(r'\sstyle="([^"]*)"', text):
        n = text.count('\n', 0, m.start()) + 1
        out.append(f'{rel}:{n}: style="{m.group(1)[:60]}"  — 인라인 스타일 대신 클래스로')


def main(argv):
    targets = [ROOT / a for a in argv] if argv else \
        sorted(ROOT.glob('*.html')) + sorted((ROOT / 'assets').glob('*.css'))
    out = []
    for t in targets:
        scan_file(t, out)
    for line in out:
        print(line)
    print(f'\n{len(out)}건' if out else '토큰 규칙 위반 없음')
    return 1 if out else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
