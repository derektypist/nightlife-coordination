# Nightlife Coordination

The purpose of the project is to provide the Nightlife Coordination.

## UX

As an unauthenticated user, you can view all bars in my area.

As an authenticated user, you can add myself to a bar to indicate that you are going there tonight.

As an authenticated user, you can remove myself from a bar if you no longer want to go there.

As an unauthenticated user, when you login you should not have to search again.

Try using the [Yelp API](https://www.yelp.com/developers/documentation/v3) to find venues in the cities that your users search for.

**Information Architecture**

User consists of local and facebook, which are objects.  The object local consists of username and password (both strings). The object facebook consists of id, token, email and name (all strings).

Place consists of name, zip_code, reservedList and numgoing.  All are strings except numgoing, which is a number.  In addition, reservedList is an array and numgoing is currently at 0.

## Technologies

Uses the technologies of express.js, MongoDB, Mongoose and bcrypt.

## Credits

### Content

Taken from [Tri Vi](https://github.com/triminhvi), accessed from 18 November 2021.

### Acknowledgements

- [FreeCodeCamp](https://www.freecodecamp.org)
- [Tri Vi - GitHub Repository](https://github.com/triminhvi/Nightlife_Coordination_App)
- [Yelp](https://www.yelp.com)
- [Passport](https://www.passportjs.org)