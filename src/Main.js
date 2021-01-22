import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import {makeStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/Button"
import Paper from '@material-ui/core/Paper'
import Grid from "@material-ui/core/Grid"
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

export default function Main() {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
   })
  );


  const classes = useStyles();

  const [name, setName] = useState("")
  const [title, settitle] = useState("")
  const [content, setContent] = useState("")

  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  const [error3, setError3] = useState(false)
  

  const [filterText, setFilterText] = useState("");
  const [listData2, setListData2] = useState([]);

  let userInfoArray = []
  let listitems = []
 

  var currDate = new Date()
  var date = currDate.toISOString().substr(0, 10);





  const changeValue = (e) => {
    if (e.target.name == "name") {
     setName(e.target.value)
    }
    if (e.target.name == "title") {
      settitle(e.target.value)
    }
    if (e.target.name == "content") {
      setContent(e.target.value)
     }
  }



userInfoArray = JSON.parse(localStorage.getItem("userdata")) 


 const filteredItems = userInfoArray?.filter((x) =>
      x.name.toLocaleLowerCase().includes(filterText) ||
      x.title.toLocaleLowerCase().includes(filterText)
  );
  let listData1 = [];  
  const filterData = () => {
     if (listData2.length > 0) {
       setListData2(listData1)
   }
     else {
      const itemsToDisplay = filterText ? filteredItems : listData1;
      setListData2(itemsToDisplay);
   }
};




  if (userInfoArray== null||userInfoArray.length==0) {
    listitems = "No data found"
  }else{
    listitems = userInfoArray?.map((x, i) => {
       return <li key={i} style={{ listStyleType: "none" }}>
        <Card style={{ marginBottom: "15PX",height:"100PX" }} onClick={() => {
          editdata(x, i)
          setName(x.name)
          settitle(x.title)
          setContent(x.content)
        }
        }>
          <Typography style={{ marginTop: "20PX" }}>
            <span>Notes title :<b>{x.title}</b> </span><br />
            </Typography>
          <Typography variant="body2" component="p">
            content: {x.content}
          </Typography>
        </Card>
      </li>
    })
  }




  const editdata = (x, i) => {
    const localvalue = x
    localStorage.setItem("localvalue", JSON.stringify(localvalue))
    localStorage.setItem("indexvalue", JSON.stringify(i))
    return {
      x, i
    }
}


  const deleteData = () => {
    const localeditdata2 = JSON.parse(localStorage.getItem("localvalue"))
    const indexValue2 = JSON.parse(localStorage.getItem("indexvalue"))
    userInfoArray = JSON.parse(localStorage.getItem("userdata")) || []
    if (localeditdata2) {
      userInfoArray.filter(v => {
        if (v.name == localeditdata2.name) {
          userInfoArray.splice(indexValue2, 1);
          localStorage.setItem("userdata", JSON.stringify(userInfoArray))
        }
      })
      setName("")
      settitle("")
      setContent("")
      localStorage.removeItem('localvalue')
      localStorage.removeItem('indexvalue')
    }
  }



  const newForm = () => {
    setName("")
    settitle("")
    setContent("")
    localStorage.removeItem("indexvalue")
    localStorage.removeItem("localvalue")
  }






  const submitData = (e) => {
    if(name.length===0){
      setError1(!error1)
    }
    if(name.length===0){
      setError2(!error2)
    }
    if(name.length===0){
      setError3(!error3)
    }
    if(name.length>0&&title.length>0&&content.length>0){
    const localeditdata = JSON.parse(localStorage.getItem("localvalue"))
    const indexValue = JSON.parse(localStorage.getItem("indexvalue"))
    userInfoArray = JSON.parse(localStorage.getItem("userdata")) || []
    if (localeditdata) {
      userInfoArray.filter(v => {
        if (v.name == localeditdata.name) {
          let obj = {
            name: name,
            title: title,
            content: content
          }
          userInfoArray.splice(indexValue, 1, obj);
          localStorage.setItem("userdata", JSON.stringify(userInfoArray))
        }
      })
      setName("")
      settitle("")
      setContent("")
      localStorage.removeItem('localvalue')
      localStorage.removeItem('indexvalue')
    } else {
      userInfoArray = JSON.parse(localStorage.getItem("userdata")) || []
        let obj = {
          name: name,
          title: title,
          date: date,
          content: content
        }
        console.log("obj",obj)
        userInfoArray.push(obj)
        localStorage.setItem("userdata", JSON.stringify(userInfoArray));
        setName("")
        settitle("")
        setContent("")
      }
    }
   }



  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
           <TextField
            value={filterText}
            onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
            style={{ margin: 8 }}
           placeholder="Search card"
            name="searchValue"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          /> 
           <FormControl className={classes.formControl}>
           <Select
               native
              onChange={(e) => setFilterText(e.target.value.toLocaleLowerCase())}
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
            >
              <option>--select--</option>
              {userInfoArray?.map(({ title }) => (
                <option>{title}</option>
              ))}
            </Select>
          </FormControl> 
         <Button style={{ marginBottom: "15PX" }}
            variant="contained"
            color="primary"
            style={{ textAlign: "center" }}
            onClick={() => filterData()}>
            Search
        </Button> 
          
     
           <div style={{ border: "2px solid" }}>
            <h4>Applied Filters:</h4>
            {!filteredItems?.length && (
              <div>There are no items to display adjust your filter criteria</div>
            )}
            {listData2.map((x) => (
              <div key={x.y}>
                <p >Created:{x.currentDate1}</p>
                <p> Note For:{x.name}</p>
                <p>Title:{x.title}</p>
              </div>
            ))}
          </div> 
          <Paper className={classes.paper} style={{ marginTop: "30PX" }}>
            {
              <ul>
                {listitems}
              </ul>
            }
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={6} />
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textAlign: "center" }}
                  onClick={newForm}>
                  New
              </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textAlign: "center" }}
                  onClick={submitData}
                  type="button" >
                    Save
                  </Button>
              </Grid>
              <Grid item xs={2} className="buttonText">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textAlign: "center" }}
                  onClick={deleteData} >
                  Delete
              </Button>
              </Grid>
            </Grid>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-full-width"
                    label="Created date"
                    fullWidth
                    disabled
                    type="date"
                    name="currentDate"
                    value={date}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }} />
                   
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-full-width"
                    label="name"
                    value={name}
                    style={{ margin: 8 }}
                    onChange={changeValue}
                    name="name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }} />
            
                </Grid>
              </Grid>
               {error1?"name is required":null}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-full-width"
                    label="title"
                    value={title}
                    onChange={changeValue}
                    style={{ margin: 8 }}
                    name="title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }} />
             
                </Grid>
              </Grid>
              {error2?"title is required":null}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextareaAutosize
                    value={content}
                    rows={20}
                    cols={160}
                    onChange={changeValue}
                    name="content"
                    variant="outlined"
                    aria-label="maximum height" 
                    />
               </Grid>
              </Grid>
              {error3?"content is required":null}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

