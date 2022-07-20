console.log("java script")
const weatherform=document.getElementById("f")
const search=document.getElementById('search')
const res1=document.getElementById("p")

weatherform.addEventListener('submit',(e)=>
{
    
    e.preventDefault()
    const location =search.value
    
    res1.textContent=""
    res1.textContent="loading"
    fetch("http://localhost:3000/weather?search="+location).then((data)=>
    {
        data.json().then((res)=>
        {
            
            if(res.err === "match not found")
            {
                console.log("22")
                res1.textContent="Match not found"
            }
            else if(res.err==="unable to connect")
            {
                res1.textContent="unable to connect"
            }
            else{

                res1.textContent="It is "+res.des+" in "+location+" and the temperature is "+res.temp+" degree"
            }
        })
    })
})

