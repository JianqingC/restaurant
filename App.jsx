import React from 'react'; 

import Header from './components/Header';
import TopTen from './components/TopTen';
import LocR from './components/LocR';
import UserR from './components/UserR';

export default class App extends React.Component {
   constructor(props){
      super(props);
      var Mock = require('mockjs');
      var _ = require('underscore');
      var types_region = ["american","mexican","chinese","japanese","korean","italian","spain"];
      var types = ["brunch","vegan","grill","buffet","vegetarian","organic","seafood"];
      var citys =['Los Angeles','Santa Babara','San Diego'];
      var x = Mock.mock({'data|500-1500': 
            [{
               'name': function(){return Mock.Random.title(1, 6);},
               'stars': function(){return Mock.Random.integer(1,5);},
               'reviews':function(){return Mock.Random.integer(1,5000);},
               'location':{'x':function(){return Mock.Random.integer(-500,500);},
                           'y':function(){return Mock.Random.integer(-500,500);},
                           'city':function(){return Mock.Random.pick(citys);},
                           'state':'CA',
                           'zip':function(){return Mock.Random.zip();}},
               'categories':function(){var region = Mock.mock([function(){return Mock.Random.pick(types_region);}]); 
                                       var other = Mock.mock({'array|1-3': [function(){return Mock.Random.pick(types);}]}).array;
                                       var finalre = _.flatten([other,region]);
                                       return finalre;},
               }]
         });
      console.log(x);
      var test = [{"name":"r1",
           "stars":4,
           "reviews":1000,
           "categories":["brunch","american","vegan"],
           "location":{"x":100,"y":-200,'city':'Sunnyvale','state':'CA','zip':function(){return Mock.Random.zip();}}
          },
          {"name":"r2",
           "stars":1,
           "reviews":130,
           "categories":["american"],
           "location":{"x":190,"y":-82.02,'city':'Sunnyvale','state':'CA','zip':function(){return Mock.Random.zip();}}
          },
          {"name":"r3",
           "stars":3,
           "reviews":100,
           "categories":["mexican"],
           "location":{"x":100,"y":104,'city':'Sunnyvale','state':'CA','zip':function(){return Mock.Random.zip();}}
          },
          {"name":"r4",
           "stars":4,
           "reviews":100,
           "categories":["chinese"],
           "location":{"x":100,"y":-200,'city':'Sunnyvale','state':'CA','zip':function(){return Mock.Random.zip();}}
          },
          {"name":"r5",
           "stars":3,
           "reviews":12000,
           "categories":["japanese","grill"],
           "location":{"x":190,"y":-82.02,'city':'Sunnyvale','state':'CA','zip':function(){return Mock.Random.zip();}}
          },
          {"name":"r6",
           "stars":4,
           "reviews":100,
           "categories":["american","grill"],
           "location":{"x":-10,"y":-82.02,'city':'Sunnyvale','state':'CA','zip':function(){return Mock.Random.zip();}}
          }];
      test.forEach(function(r){x.data.push(r);});
      //console.log(JSON.stringify(x));
      this.state =x;
   }

   render() {
      
      var sortedAll=[];

      sortedAll = this.state.data.sort(function(a,b){
         if(a.stars!=b.stars){return b.stars-a.stars;
         }else{return b.reviews-a.reviews;}
         });
      var index = sortedAll.length>3?3:(sortedAll.length);
      return (
         <div>
            <Header/>
            <TopTen wholeSet={sortedAll.slice(0,index)}/>
            <LocR wholeSet={this.state.data}/>
            <UserR wholeSet={this.state.data}/>
         </div>
      );
   }
}


//export default App;
