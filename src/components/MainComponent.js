import React, {Component} from 'react';
import Menu from './MenuComponents';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import AboutUs from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render () {

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    
    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    return (
      <div>
          <Header/>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/contactus' component={Contact} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route
                path="/aboutus"
                component={() => <AboutUs leaders={this.state.leaders} />}
              />
               <Route path='/menu/:dishId' component={DishWithId} />
              <Redirect to="/home" />
          </Switch>
           <Footer/>
      </div>
    );
  }  
}
  
export default Main;
