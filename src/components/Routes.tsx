import {FC} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Posts} from "../pages/Posts";
import {PostDetails} from "../pages/PostDetails";

export const Routes: FC = () => {
   const helloMessage = 'Hello from ';

   return (
      <div className='container'>
         <Switch>
            <Route exact path='/'>
               <Redirect to='/posts' />
            </Route>
            <Route exact path='/posts'>
               <Posts helloMessage={helloMessage}/>
            </Route>
            <Route path='/posts/:id'>
               <PostDetails helloMessage={helloMessage}/>
            </Route>
         </Switch>
      </div>
   )
}