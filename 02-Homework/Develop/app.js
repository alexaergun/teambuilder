const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
////////FUNCTION START/////////

const initialQuestions = [

  {
    type: "input",
    name: "name",
    message: "What is the manager's name?"
  },
  {
    type: "input",
    message: "What the manager's employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the manger's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the manger's office number?",
    name: "officeNumber", 
  },
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member", 
    choices: ["engineer","intern"]
  }
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the employee's github username?",
    name: "github", 
  }
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What school is the employee going to?",
    name: "school", 
  }
];

const continueOrEnd = [
  {
    type: "checkbox",
    message: "Add more members?",
    name: "choice",
    choices: ["true","false"]
  }
]

const typeOfMember = [
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member1", 
    choices: ["engineer","intern"]  
  }
]

inquirer
  .prompt(initialQuestions)

  .then(function(user) {
    
    const templateMainFile = fs.readFileSync(`./templates/main.html`,  { encoding: 'utf8' });

    //first the manager card
    const manager = new Manager (user.name , user.id , user.email , user.officeNumber);
    
    let team = renderHTML(manager);
    let proceed = true;


    //adding team members
    AddorStop(proceed,user.member[0],team,templateMainFile);
    
    
  })
  .catch(err=>console.log(err));


function renderHTML (position){
    const templateFile = fs.readFileSync(`./templates/${position.getRole().toLowerCase()}.html`,  { encoding: 'utf8' });
    let temporaryFile = templateFile.replace('{{ name }}', position.name);
    temporaryFile = temporaryFile.replace('{{ role }}', position.getRole());
    temporaryFile = temporaryFile.replace('{{ id }}', position.id);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);


    if(position.getRole().toLowerCase()==="engineer"){
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
      }else if(position.getRole().toLowerCase()==="intern"){
        temporaryFile = temporaryFile.replace('{{ school }}', position.school);
      }else if(position.getRole().toLowerCase()==="manager"){
        temporaryFile = temporaryFile.replace('{{ officeNumber }}', position.officeNumber);
    }

    return temporaryFile;
}

async function AddorStop (proceed,chosenMember,team, templateMainFile) {
  try {
    do{
      switch(chosenMember){
        case "engineer":
        const engineer = await inquirer.prompt(engineerQuestions);
        console.log(engineer);
        
        let engineer1 = new Engineer(engineer.name , engineer.id, engineer.email,engineer.github);
        let engineer1card = renderHTML(engineer1);
        team = team + engineer1card
        console.log(team);
        let nextMove = await inquirer.prompt(continueOrEnd);
        console.log(nextMove);
        
        if(nextMove.choice[0]==="false"){
            proceed = false;
            console.log(proceed,"THIS IS PROCEED STATUS");
            let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
            fs.writeFileSync("index.html",temporaryMainFile);
        } else if (nextMove.choice[0]==="true"){
          const newMember = await inquirer.prompt(typeOfMember);
          chosenMember = newMember.member1[0];
        }
        break;  
        case "intern":
        const intern = await inquirer.prompt(internQuestions);
          let intern1 = new Intern(intern.name , intern.id, intern.email,intern.school);
          let intern1Card = renderHTML(intern1);
          team = team + intern1Card
          console.log(team);
        let nextMove1 = await inquirer.prompt(continueOrEnd);
         
            if(nextMove1.choice[0]==="false"){
              proceed = false;
              let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
              fs.writeFileSync("index.html",temporaryMainFile);
            } else if (nextMove1.choice[0]==="true"){
              const newMember1 = await inquirer.prompt(typeOfMember);
              chosenMember = newMember1.member1[0];
            }
        break;
      }
    }while(proceed)

  
  } catch (err) {
    console.log(err);
  }
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
