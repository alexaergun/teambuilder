Generates an HTML webpage to display an engineering team.

EMPLOYEE class includes the properties and methods:
name
id
title
getName()
getID()
getEmail()
getRole() // Returns 'Employee'

MANAGER class - extend Employee class
will have all of the above properties for Employee class, plus the below properties and methods:
officeNumber
getRole // Overridden to return 'Manager'

ENGINEER class - extend Employee class
will have all of the above properties for Employee class, plus the below properties and methods:
github // GitHub usernam
getGitHub()
getRole // Overridden to return 'Manager'

INTERN class - extend Employee class
will have all of the above properties for Employee class, plus the below properties and methods:
school
getSchool()
getRole() // Overridden to return 'Intern'
