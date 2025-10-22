You will implement a very simple web flashcard application that is 100% iPhone-compatible. The application will be completely frontend-based (html/css/js) and contained in a single html file. It will randomly choose one of the 2-letter words from the following list and randomly (50%) capitalize the first letter, and then display that in large text on the screen in one of 2 fonts, chosen randomly (50%): "Atkinson Hyperlegible" (or equivalent high-quality sans-serif font), or "Baskerville" (or equivalent high-quality serif font), which you will src from the Internet (google fonts, etc.). When the user taps or clicks the screen, it will advance to the next randomly-selected letter pair with the same randomly-selected capitalization.
The purpose of this is to give my son some practice on reading small words aloud, in various capitalizations, while getting used to both serif and sans-serif letter forms.
The card background will be white and the letters black.
The letters will be centered horizontally and vertically on the screen given the current viewport size, occupying much of the screen (but leaving a gap around them).
The randomization should be deterministic for testing purposes and should be seeded with the current timestamp (or a value that can be injected from outside, such as from a test or command-line argument when running via Deno).

Which is to say, there should also be a test suite runnable via deno.

Any dependencies should be managed via a flake.nix file that you create.

The test should be runnable via a "test" executable script in the root of this project.

You will write the code such that the letter combinations are easily editable by someone with access to the source code (so, 1 per line, in an array or whatever).

Here is the list:

ba
be
bi
bo
bu
ca
ce
ci
co
cu
da
de
di
do
du
fa
fe
fi
fo
fu
ga
ge
gi
go
gu
ha
he
hi
ho
hu
ja
je
ji
jo
ju
ka
ke
ki
ko
ku
la
le
li
lo
lu
ma
me
mi
mo
mu
na
ne
ni
no
nu
pa
pe
pi
po
pu
ra
re
ri
ro
ru
sa
se
si
so
su
ta
te
ti
to
tu
va
ve
vi
vo
vu
wa
we
wi
wo
wu
ya
ye
yi
yo
yu
za
ze
zi
zo
zu
ab
ac
ad
af
ag
ah
aj
ak
al
am
an
ap
ar
as
at
av
aw
ay
az
eb
ec
ed
ef
eg
eh
ej
ek
el
em
en
ep
er
es
et
ev
ew
ey
ez
ib
ic
id
if
ig
ih
ij
ik
il
im
in
ip
ir
is
it
iv
iw
iy
iz
ob
oc
od
of
og
oh
oj
ok
ol
om
on
op
or
os
ot
ov
ow
oy
oz
ub
uc
ud
uf
ug
uh
uj
uk
ul
um
un
up
ur
us
ut
uv
uw
uy
uz

## 2025-10-22 Progress Notes
- Initialized colocated `jj` + git repository and verified working copy recovery workflow.
- Established initial project feature list and TDD approach with user.
- Created `FILES.md` to track newly added artifacts.
- Implemented first generator TDD test and passing implementation with seedable RNG.
- Added `flake.nix`, `flake.lock`, and `test` script to lock down the Deno-based test harness.
- Expanded generator domain to expose default word/font lists with deterministic output and defaults.
- Drove UI adapter/service composition with deterministic tests and implemented single-file HTML with responsive styling and font sourcing.
- Completed responsive styling, font integration, and automated bootstrap; `./test` green across generator, engine, and UI suites.
- Ready for user review or deployment packaging.
- Tweaked typography sizing and swapped serif font to EB Garamond per UI feedback; regression suite remains green.
- Expanded font rotation to include Helvetica, Libre Baskerville, EB Garamond, Tinos (Times-like), and Atkinson Hyperlegible with deterministic coverage.
- Moved deliverable to `docs/index.html` with root symlink to satisfy GitHub Pages hosting while keeping dev tooling unchanged.
- Replaced Helvetica with Quicksand to introduce single-storey “a”/“g” exposure while retaining five-font rotation and green test suite.
