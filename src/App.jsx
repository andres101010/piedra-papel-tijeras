import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './App.css'
import '@fontsource/roboto/300.css';
import Typography from '@mui/material/Typography';
import piedra from './assets/piedra.jpg'
import papel from './assets/papel.jpg'
import tijeras from './assets/tijeras.jpg'

const obj = [
  {id:0, nombre:"Piedra", img: piedra , gana:[2]},
  {id:1, nombre:"Papel", img: papel, gana:[0]},
  {id:2, nombre:"Tijeras", img: tijeras, gana:[1]}
]


const getResult= (choiseUser,choisComputer)=>{
  if(choiseUser === choisComputer){ 
  return 0
  }
  else if(obj[choiseUser].gana.includes(choisComputer)){
  return 1
  }else{ 
  return 2
  }
}
const App = ()=>{

  const [choiseUser, setChoiceUser] = useState(null);
  const [choisComputer, setChoisComputer] = useState(null)
  const [result, setResult] = useState(null)
  const [disable,setDisable] = useState(false)
  const [userMessage, setUserMessage] = useState(null)
  const [computerMessage, setComputerMessage] = useState(null)

  

  useEffect(()=>{
    
   if(choiseUser !== null){
     setUserMessage(`Elegiste ${obj[choiseUser]?.id}- ${obj[choiseUser].nombre}`)
     
     console.log(obj[choiseUser].id)
   }
   if(choisComputer !== null){
    setComputerMessage(`El ordenador a elegido ${obj[choisComputer]?.id}- ${obj[choisComputer].nombre}`)}
    console.log(obj[choisComputer])
  },[choiseUser,choisComputer])

  // useEffect(()=>{
  //  if(choisComputer !== null){
  //    setComputerMessage(`El ordenador a elegido ${obj[choisComputer]?.id}- ${obj[choisComputer].nombre}`)
     
  //  }
  // },[choisComputer])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:'5px'
  }));

  const handlePlay = (choise)=>{
    console.log(choise)
    setChoiceUser(choise)
      setDisable(true)

      const randomChoise = Math.floor(Math.random() * 3)

      setTimeout(()=>{
        setChoisComputer(randomChoise)
      },1500)

      setTimeout(()=>{
        setResult(getResult(choise, randomChoise))
      },3000)

    clearTimeout()
  } 

  const reset = ()=>{
    setChoiceUser(null)
    setChoisComputer(null)
    setUserMessage(null)
    setComputerMessage(null)
    setResult(null)
    setDisable(false)
  }
 

  return (
    <div className="App">
     <Typography variant="h1" >
       Piedra, Papel o Tijeras
     </Typography>; 
     <Typography variant="h2">
       Selecciona uno!
     </Typography>; 
    
     
     <div className='container'>
     
        {
          obj.map((obj)=>(
            
            <Box sx={{ flexGrow: 1 }} key={obj.id}>
              
            <Grid container spacing={3} >
              <Grid item xs={4} >
            
                  <h3>{obj.nombre}</h3>
                
                <Item style={{ width:'220px',borderRadius:'50%'}}>
                 <button  
                 key={obj.id}
                 disabled={disable}
                 onClick={()=>{handlePlay(obj.id)}}
                 title={obj.nombre} > 
                 <img style={{width:'200px',height:'220px', borderRadius:'50%',padding:'10px'}} src={obj.img}/></button>
                </Item>    
                
              </Grid>
            </Grid>
          </Box>   
          ))
        }     
     </div>
     
     {
                    choiseUser !== null && (
                      <><h3 style={{marginRight:'70px'}}>{userMessage}</h3></>
                    )
     }
     {
                    choisComputer !== null && (
                      <><h3 style={{marginRight:'70px'}}>{computerMessage}</h3></>
                    )
     }
     {
                    result === 0 && (
                      <><h3 style={{marginRight:'70px'}}>{"Es empate"}</h3></>
                    )
     }
     {
                    result === 1 && (
                      <><h3 style={{marginRight:'70px'}}>{"Ganaste!"}</h3></>
                    )
     }
     {
                    result === 2 && (
                      <><h3 style={{marginRight:'70px'}}>{"Perdiste!"}</h3></>
                    )
     }
     { 
            result !== null &&
      <button onClick={()=>{reset()}} style={{color:'red', width:'200px',height:'80px', backgroundColor:'white',marginLeft:'20px'}}>Volver a Jugar!</button> 
     }
     
    </div>
  )
}

export default App
