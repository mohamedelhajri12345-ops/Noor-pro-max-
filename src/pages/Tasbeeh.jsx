import React,{useEffect,useState} from 'react';
export default function Tasbeeh(){
 const [count,setCount]=useState(Number(localStorage.getItem('noor.tasbeeh')||0)); const [goal,setGoal]=useState(Number(localStorage.getItem('noor.tasbeehGoal')||33)); const [vibrate,setVibrate]=useState(localStorage.getItem('noor.tasbeehVibrate')!=='off');
 useEffect(()=>localStorage.setItem('noor.tasbeehGoal',String(goal)),[goal]);
 const tap=()=>{const n=count+1;setCount(n);localStorage.setItem('noor.tasbeeh',String(n));if(vibrate&&navigator.vibrate)navigator.vibrate(12)};
 const reset=()=>{setCount(0);localStorage.setItem('noor.tasbeeh','0')};
 return <section className="page center-page fade-in"><div className="page-title"><span>المسبحة الإلكترونية</span><small>تعمل محليًا بدون إنترنت</small></div><div className="tasbeeh-ring"><div><strong>{count}</strong><span>من {goal}</span></div></div>{count>=goal&&<div className="notice">أحسنت، اكتمل الهدف ✨</div>}<button className="tasbeeh-button" onClick={tap}>سَبِّح</button><div className="goal-row">{[33,99,100].map(g=><button className={goal===g?'selected':''} onClick={()=>setGoal(g)} key={g}>{g}</button>)}<button onClick={reset}>تصفير</button></div><label className="setting-row"><span>اهتزاز عند الضغط</span><input type="checkbox" checked={vibrate} onChange={e=>{setVibrate(e.target.checked);localStorage.setItem('noor.tasbeehVibrate',e.target.checked?'on':'off')}}/></label></section>;
}
