const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1546446098762043473/P_itCGb6Zf09j94062NTddM54l3xju9w93QetbDTlgCwb5SIT8QgGItPv08TjQqQeoxv";

function getEventColor(status) {
  switch (status) {
    case "completed":
      return 0x57f287;

    case "cancelled":
      return 0xed4245;

    default:
      return 0x5865f2;
  }
}

export function createEventEmbed(event) {
  return {
    title: `📅 ${event.title}`,

    description:
      event.description ||
      "No description provided.",

    color: getEventColor(event.status),

    fields: [
      {
        name: "📆 Date",
        value: event.date || "TBA",
        inline: true,
      },

      {
        name: "⏰ Time",
        value: event.time || "TBA",
        inline: true,
      },

      {
        name: "📍 Location",
        value: event.location || "TBA",
        inline: true,
      },

      {
        name: "👤 Organizer",
        value: event.organizer || "TBA",
        inline: true,
      },

      {
        name: "👥 Capacity",
        value: event.capacity
          ? String(event.capacity)
          : "Unlimited",
        inline: true,
      },

      {
        name: "📌 Status",
        value:
          event.status?.toUpperCase() ||
          "UPCOMING",
        inline: true,
      },
    ],

    footer: {
      text: "College Event Manager",
    },

    timestamp: new Date().toISOString(),
  };
}

export async function sendEventToDiscord(event) {
  if (!DISCORD_WEBHOOK_URL) {
    throw new Error(
      "Discord webhook is not configured."
    );
  }

  const response = await fetch(
    DISCORD_WEBHOOK_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "College Event Manager",

        embeds: [
          createEventEmbed(event),
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Discord request failed: ${response.status}`
    );
  }

  return true;
}

export async function sendCancellationToDiscord(
  event,
  reason
) {
  if (!DISCORD_WEBHOOK_URL) {
    throw new Error(
      "Discord webhook is not configured."
    );
  }

  const response = await fetch(
    DISCORD_WEBHOOK_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "College Event Manager",

        embeds: [
          {
            title: "🚨 EVENT CANCELLED",

            description:
              `**${event.title}** has been cancelled.`,

            color: 0xed4245,

            fields: [
              {
                name: "📆 Date",
                value:
                  event.date || "TBA",
                inline: true,
              },

              {
                name: "⏰ Time",
                value:
                  event.time || "TBA",
                inline: true,
              },

              {
                name: "📍 Location",
                value:
                  event.location || "TBA",
                inline: true,
              },

              {
                name: "Reason",
                value:
                  reason ||
                  "No reason provided.",
              },
            ],

            footer: {
              text: "College Event Manager",
            },

            timestamp:
              new Date().toISOString(),
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Discord request failed: ${response.status}`
    );
  }

  return true;
}
