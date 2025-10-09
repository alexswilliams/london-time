BUILD_DEPS = Makefile package.json package-lock.json tsconfig.json src/package.json

.PHONY: all test clean release
.DEFAULT: all

all: dist/london-time.js dist/london-time.min.js dist/london-time.d.ts test

dist/README.md: README.md
	cp README.md dist/

dist/london-time.js dist/london-time.d.ts dist/london-time.d.ts.map: src/london-time.ts $(BUILD_DEPS)
	npm run src:build

dist/london-time.min.js dist/london-time.min.js.map: src/london-time.ts $(BUILD_DEPS)
	npm run src:minify

test: src/**.test.* $(BUILD_DEPS)
	npm run src:test

clean:
	rm -f dist/*.js
	rm -f dist/*.map
	rm -f dist/*.d.ts
	rm -f dist/README.md

release:
	npm --workspace=dist publish --provenance --access public
