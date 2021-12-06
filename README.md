# Nightlife Coordination

The purpose of the project is to provide the Nightlife Coordination.

## UX

**Getting Started**

Enter the zip code (or equivalent, e.g. Postcode in the United Kingdom).  Then select Go! (use the mouse or keyboard).

**User Stories**

As an unauthenticated user, you can view all bars in my area.

As an authenticated user, you can add myself to a bar to indicate that you are going there tonight.

As an authenticated user, you can remove myself from a bar if you no longer want to go there.

As an unauthenticated user, when you login you should not have to search again.

Try using the [Yelp API](https://www.yelp.com/developers/documentation/v3) to find venues in the cities that your users search for.

**Information Architecture**

User consists of local and facebook, which are objects.  The object local consists of username and password (both strings). The object facebook consists of id, token, email and name (all strings).

Place consists of name, zip_code, reservedList and numgoing.  All are strings except numgoing, which is a number.  In addition, reservedList is an array and numgoing is currently at 0.

In the form - zip_code is text.

**Important Notes**

As this project was worked on during Coronavirus:

- Travel Restrictions may apply
- Certain countries maybe in lockdown
- Do not make any reservations if you experience COVID-19 Symptoms or if you are self-isolating
- If a reservation has already been made and since you have made that reservation, you experience COVID-19 Symptoms or are self-isolating, remove the reservation
- If a reservation has already been made and there is a lockdown, you may hang on to that reservation for a future date or remove the reservation
- Check the web site for further information including their Facebook Pages, Twitter Pages, etc.
- Place check with Government in your country, e.g. [UK Government](https://www.gov.uk)

## Features

The ability to search for bars, as well as add and remove reservations.

## Technologies

Uses the technologies of express.js, Pug, CSS3, MongoDB, Mongoose, Bootstrap 5.1.3, Font Awesome 5.15.4, Passport, Yelp and bcrypt.

## Testing

Make sure all the user stories have been tested.

## Deployment

Live on [REPL](https://nightlife-coordination.ddxps46.repl.co)

## Credits

### Content

Taken from [Tri Vi](https://github.com/triminhvi), accessed from 18 November 2021 to 6 December 2021.

### Acknowledgements

- [FreeCodeCamp](https://www.freecodecamp.org)
- [Tri Vi - GitHub Repository](https://github.com/triminhvi/Nightlife_Coordination_App)
- [Yelp](https://www.yelp.com)
- [Passport](https://www.passportjs.org)
- [Bootstrap](https://www.getbootstrap.com)
- [Yelp Fusion](https://www.github.com/Yelp/yelp-fusion)