const mc =
require(
  "minecraft-protocol"
);

const express =
require("express");

const app =
express();

// ── WEB SERVER ─────────────────────
app.get(
  "/",
  (req, res) => {

    res.send(
      "BarkadaBot Online!"
    );
  }
);

app.listen(
  process.env.PORT || 3000,
  () => {

    console.log(
      "Web server running."
    );
  }
);

// ── CONNECT BOT ────────────────────
function connectBot() {

  console.log(
    "Connecting bot..."
  );

  const client =
    mc.createClient({

      host:
        "barkadacraftsmp.sg1-mczie.fun",

      port:
        4090,

      username:
        "BarkadaBot",

      auth:
        "offline",

      version:
        "1.19.4"
    });

  // ── CONNECTED ────────────────────
  client.on(
    "connect",
    () => {

      console.log(
        "Bot connected!"
      );

      // fallback auto login
      setTimeout(() => {

        try {

          client.write(
            "chat_command",
            {
              command:
                "login 011020"
            }
          );

          console.log(
            "Fallback login sent"
          );

        } catch (e) {

          console.log(e);
        }

      }, 10000);
    }
  );

  // ── PACKET LISTENER ──────────────
  client.on(
    "packet",
    (data, meta) => {

      try {

        const msg =
          JSON.stringify(data);

        console.log(
          "[PACKET]",
          msg
        );

        // ── REGISTER DETECT ────────
        if (
          msg.includes(
            "/register"
          )
        ) {

          console.log(
            "Register detected"
          );

          client.write(
            "chat_command",
            {
              command:
                "register 011020 011020"
            }
          );

          console.log(
            "Register command sent"
          );
        }

        // ── LOGIN DETECT ───────────
        if (
          msg.includes(
            "/login"
          )
        ) {

          console.log(
            "Login detected"
          );

          client.write(
            "chat_command",
            {
              command:
                "login 011020"
            }
          );

          console.log(
            "Login command sent"
          );
        }

      } catch (e) {

        console.log(
          "PACKET ERROR:",
          e
        );
      }
    }
  );

  // ── DISCONNECT ───────────────────
  client.on(
    "end",
    () => {

      console.log(
        "Bot disconnected."
      );

      setTimeout(() => {

        connectBot();

      }, 10000);
    }
  );

  // ── ERROR ────────────────────────
  client.on(
    "error",
    err => {

      console.log(
        "BOT ERROR:",
        err
      );
    }
  );
}

// ── START ──────────────────────────
connectBot();
