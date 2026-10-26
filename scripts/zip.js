// Packages dist/ into release/<name>-<version>.zip for store upload.
import AdmZip from 'adm-zip'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

if (!existsSync('dist')) {
	console.error('dist/ not found. Run `npm run build` first.')
	process.exit(1)
}

mkdirSync('release', { recursive: true })
const out = `release/${pkg.name}-${pkg.version}.zip`
const zip = new AdmZip()
// Skip folder READMEs that Vite copies from public/.
zip.addLocalFolder('dist', '', (file) => !/(^|[\\/])README\.md$/.test(file))
zip.writeZip(out)
console.log(`Created ${out}`)
