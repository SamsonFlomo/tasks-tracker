import { useState, useEffect } from 'react'
import './App.css'
import Startup from './components/Startup'
import NavBar from './components/NavBar'
import Main from './components/Main'
import Modify from './components/modify'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// FIREBASE IMPORTS
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { taskCollection, userCollection } from './firebase';



function App() {
  const [user, setUser] = useState({
    name: "",
    next: false,
    id: ""
  })

  const [tasks, setTasks] = useState([{
    description: "",
    timeFrame: "",
    id: 1
  },])

  const [editedTask, setEditedTask] = useState({
    description: "React",
    timeFrame: "Task Time",
    isEdit: false,
    id: 1
  })

  const [mode, setMode] = useState(JSON.parse(window.localStorage.getItem("mode")) || false)

  // HANDLE FUNCTIONS Arena
  // FIREBASE AND HANDLE USER 
  //
  function toggleNext() {
    setUser(prevUser => ({
      ...prevUser,
      next: !prevUser.next
    }))
  }
  function saveUserToState(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function updateUserDb() {
    const docRef = await addDoc(userCollection, {
      name: user.name,
      next: !user.next
    })
    setUser(prevUser => ({
      ...prevUser,
      id: docRef.id
    }))
  }

  // FIREBASE AND HANDLE TASKS
  async function saveTasksToDb() {
    tasks.forEach(async (task) => {
      await addDoc(taskCollection, {
        description: task.description,
        timeFrame: task.timeFrame,
        id: task.id
      })
    })
  }

  //MAIN AND TASKS

  /*
  function removeTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }
  */
  async function removeTask(id) {
    const docRef = doc(taskCollection, id)
    await deleteDoc(docRef)
  }

  async function removeAllTasks() {
    // HOW TO REMOVE ALL TASKS FIRESTORE DATABASE
    for (let i = 0; i < tasks?.length; i++) {
      const task = tasks[i]
      if (task.id) {
        const docRef = doc(taskCollection, task.id)
        await deleteDoc(docRef)
      }
    }
  }

  function toggleEdit(id = "id") {
    const newTask = tasks.find(task => task.id === id)
    newTask ?
      setEditedTask(prevTask => {
        return {
          ...prevTask,
          description: newTask.description,
          timeFrame: newTask.timeFrame,
          id: newTask.id,
          isEdit: !prevTask.isEdit
        }
      })
      :
      setEditedTask(prevTask => ({
        ...prevTask,
        isEdit: !prevTask.isEdit
      }))
  }

  // ADD TASK

  /* 
 function addTask() {
  const newTask = {
    description: "NAME",
    timeFrame: "TIME",
    id: Date.now()
  }
  setTasks(prevTasks => [newTask, ...prevTasks])
  setEditedTask(newTask)
  toggleEdit()
}
 */

  async function addTask() {
    const newTask = {
      description: "NAME",
      timeFrame: "TIME"
    }
    const docRef = await addDoc(taskCollection, newTask)
    setEditedTask({
      ...newTask,
      isEdit: true,
      id: docRef.id
    })
  }

  // EDIT TASK
  function handleEditChange(e) {
    setEditedTask(prevTask => ({
      ...prevTask,
      [e.target.name]: e.target.value
    }))
  }

  /*
function editTask() {
    // MAKE THE RECENTLY EDITED TASK THE TOP TASK
    const newTasks = tasks.filter(task => task.id !== editedTask.id)
    const matchedTask = tasks.find(task => task.id === editedTask.id)
    setTasks([
      {
        ...matchedTask,
        description: editedTask.description,
        timeFrame: editedTask.timeFrame
      },
      ...newTasks
    ])
    toggleEdit()
  }

  // MODE
  function toggleMode() {
    setMode(prevMode => !prevMode)
  }
   */

  async function editTask() {
    const docRef = doc(taskCollection, editedTask.id)
    await setDoc(
      docRef,
      {
        description: editedTask.description,
        timeFrame: editedTask.timeFrame
      },
      { merge: true }
    )
    toggleEdit()
  }

  // MODE
  function toggleMode() {
    setMode(prevMode => !prevMode)
  }


  // USEEFFECTS
  // FOT ADD EVENTlISTENER TO MY INPUTS
  /* useEffect(() => {
    const cleanUp = () => {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          toggleEdit()
        }
      })

      
        document.getElementById("timeFrame").addEventListener("keydown", (e) => {
         if (e.target.value && e.key === "Enter") {
           editTask()
         }
       }) 
    } 

    return cleanUp
  }) */

  // FOR USER
  useEffect(() => {
    const unsubscribe = onSnapshot(userCollection, (snapshot) => {
      const newUser = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
    })

    return unsubscribe
  }, [])

  // FOR TASKS
  useEffect(() => {
    const unsubscribe = onSnapshot(taskCollection, (snapshot) => {
      const newTasks = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setTasks(newTasks)
    })

    return unsubscribe
  }, [])

  // FOR MODE
  useEffect(() => {
    const cleanMode = () => {
      window.localStorage.setItem("mode", JSON.stringify(mode))
    }

    return cleanMode
  }, [mode])


  // RENDER


  return (
    <Container id="App" className={mode ? "dark-mode" : ""} fluid>
      <NavBar
        mode={mode}
        toggleMode={toggleMode}
      />

      {
        user.next ?
          <Main
            name={user.name}
            tasks={tasks}
            addTask={addTask}
            removeTask={removeTask}
            removeAllTasks={removeAllTasks}
            toggleEdit={toggleEdit}
          /> :
          <Startup
            user={user}
            handleChange={saveUserToState}
            handleClick={toggleNext}
          />
      }


      {
        editedTask.isEdit &&
        <Modify
          handleChange={handleEditChange}
          editedTask={editedTask}
          tasks={tasks}
          editTask={editTask}
          handleCancel={() => toggleEdit()}
        />
      }

    </Container>
  )
}

export default App; 
