import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthStatus() {
  //This is going to have Two hooks, which the first one is locked in. And this is equal to use a state. Which is coming from React and the initial value would be false. So we just suppose. That's the person is new and it's false..
  const [loggedIn, setLoggedIn] = useState(false);
  //And then and after that, we're going to check if the person is Authenticated or not..
  //And also, we need some time to get the information from Firebase.
  //So we need to add another hook that check the status, which is we want to know that the information
  const [checkingStatus, setCheckingStatus] = useState(true);

  //So now we want to use use effect to ask Firebase that if the person is authenticated or not. So we add a user effect here which is coming from React..
  useEffect(() => {
    //First we need to get the Auth Initialize it by using getAuth. Which is coming from firebase forward slash of..
    const auth = getAuth()
    //After that, we're going to use another method from Firebase Off called an off state change.
    //So we need to import on off state change, which is coming from Firebase for slash off.
    //And this is going to take the Auth. And it's this is going to give us the user.
    onAuthStateChanged(auth,(user)=>{
        //And here we're going to check if the user exists or not.
        if(user){
            //So we just said if the user exists. Then set the lock in to be true.
            //So the person is existing so it means it is authenticated.
            setLoggedIn(true)
        }
        //After we are sure that the person is existed or not.
        //We can set the check checking status to follow so the loading effects is going to finish.
        setCheckingStatus(false)
    })
  },[]);//And we need to add the bracket here. So we just want to call the use effect one time.

  return {loggedIn,checkingStatus}
}
