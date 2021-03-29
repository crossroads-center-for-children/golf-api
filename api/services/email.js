const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getNamesOfTeammates = (teammates) => {
  const namesOfTeammates = [];

  for (const { firstName, lastName } of teammates) {
    if (firstName && lastName) {
      namesOfTeammates.push(`${firstName} ${lastName}`);
    }
  }

  return namesOfTeammates.join(", ");
};

const buildRegistrationEmail = ({
  orderNumber,
  teamName,
  numGolfers,
  primary,
  otherGolfers,
}) => ({
  to: "vickir@crossroadcenter.org",
  cc: "support@crossroadscenter.app",
  from: "support@crossroadscenter.app",
  subject: `New Registration - ${teamName} - ${numGolfers} golfer${
    numGolfers === 1 ? null : "s"
  }`,
  text: `
    Hey!

    New registration! Details:

    Order number: ${orderNumber}

    Team name: ${teamName}

    Primary: ${primary.firstName} ${primary.lastName}

    Teammates: ${numGolfers === 1 ? "None" : getNamesOfTeammates(otherGolfers)}

    Best,
    Matt
  `,
});

const sendRegistrationEmail = ({
  orderNumber,
  teamName,
  numGolfers,
  primary,
  otherGolfers,
}) => {
  sgMail
    .send(
      buildRegistrationEmail({
        orderNumber,
        teamName,
        numGolfers,
        primary,
        otherGolfers,
      })
    )
    .then(() => console.log("Email sent."))
    .catch((err) => console.log(err));
};

module.exports = {
  sendRegistrationEmail,
};
