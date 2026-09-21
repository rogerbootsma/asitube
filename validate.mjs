import {readdir,readFile,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {Script} from 'node:vm';
const root=resolve('dist');let refs=0;
const files=await readdir(root,{recursive:true});
for(const file of files){
  if(file.endsWith('.js'))new Script(await readFile(resolve(root,file),'utf8'),{filename:file});
  if(!file.endsWith('.html'))continue;
  const html=await readFile(resolve(root,file),'utf8');
  if(!html.includes('name="viewport"'))throw Error(`Missing viewport: ${file}`);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const link=match[1];if(/^(https?:|mailto:|data:)/.test(link))continue;
    const [path,hash]=link.split('#');
    const target=path?resolve(dirname(resolve(root,file)),path.endsWith('/')?path+'index.html':path):resolve(root,file);
    if(!(await stat(target)).isFile())throw Error(`Missing file ${link} in ${file}`);
    if(hash&&!new RegExp(`id=["']${hash}["']`).test(await readFile(target,'utf8')))throw Error(`Missing anchor ${link} in ${file}`);
    refs++;
  }
}
const index=await readFile(resolve(root,'index.html'),'utf8');
if(!index.includes('https://www.youtube.com/@ASI-Tube'))throw Error('Missing canonical YouTube channel');
if(!index.includes('https://asimulation.io'))throw Error('Missing ASimulation link');
if(!index.includes('IN DEVELOPMENT')||!index.includes('PLANNED EXPERIENCE'))throw Error('Missing concept-stage disclosures');
console.log(`Validated ${files.filter(x=>x.endsWith('.html')).length} pages, ${refs} local references and anchors, JavaScript syntax, channel link, and project status.`);
