/* Shared by the homepage and standalone download page. */
(() => {
 const button=document.querySelector('#download-button');
 const status=document.querySelector('#download-status');
 const progress=document.querySelector('#download-progress');
 if(!button||!status||!progress)return;
 button.addEventListener('click',async()=>{
  button.disabled=true;button.innerHTML='<span class="button-inner">正在准备便携包…</span>';
  progress.hidden=false;progress.value=0;
  try{
   const response=await fetch('release/manifest.json');
   if(!response.ok)throw Error('暂时无法读取发行信息');
   const manifest=await response.json();
   if(!Array.isArray(manifest.parts)||!Number.isSafeInteger(manifest.bytes)||manifest.bytes<=0)throw Error('发行信息无效');
   let loaded=0;const chunks=[];
   for(const path of manifest.parts){
    if(!/^release\/part-\d{2}\.bin$/.test(path))throw Error('下载路径无效');
    const res=await fetch(path);if(!res.ok)throw Error('下载中断，请稍后重试');
    const report=()=>{progress.value=loaded/manifest.bytes*100;status.textContent=`正在下载 ${Math.round(loaded/manifest.bytes*100)}% · ${(loaded/1048576).toFixed(1)} / ${(manifest.bytes/1048576).toFixed(1)} MB`;};
    const reader=res.body?.getReader();
    if(reader){while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);loaded+=value.byteLength;if(loaded>manifest.bytes)throw Error('文件大小不匹配');report();}}
    else{const value=new Uint8Array(await res.arrayBuffer());chunks.push(value);loaded+=value.length;report();}
   }
   if(loaded!==manifest.bytes)throw Error('文件下载不完整');
   const blob=new Blob(chunks,{type:'application/zip'});
   if(crypto?.subtle){status.textContent='下载完成，正在校验文件完整性…';const digest=await crypto.subtle.digest('SHA-256',await blob.arrayBuffer());const hash=[...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join('');if(hash!==manifest.sha256)throw Error('文件完整性校验未通过');}
   const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=manifest.filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
   status.textContent='便携包已准备好，请保存 ZIP，完整解压后运行 InstaCourse.exe。';
  }catch(error){status.textContent=`${error.message}。点击下载按钮可重试。`;}
  finally{button.disabled=false;button.innerHTML='<span class="button-inner">下载 Windows 便携包 <span>↓</span></span>';}
 });
})();
