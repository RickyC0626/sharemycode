import { authorize } from "@liveblocks/node";
import { NextResponse } from "next/server";

const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY!;

export async function POST(request: Request) {
  /**
   * Implement your own security here.
   *
   * It's your responsibility to ensure that the caller of this endpoint
   * is a valid user by validating the cookies or authentication headers
   * and that it has access to the requested room.
   */
  const { room } = await request.json();

  // For the avatar example, we're generating random users
  // and set their info from the authentication endpoint
  // See https://liveblocks.io/docs/api-reference/liveblocks-node#authorize for more information
  const userIndex = Math.floor(Math.random() * NAMES.length);
  const result = await authorize({
    room,
    secret: API_KEY,
    userId: `user-${userIndex}`,
    userInfo: {
      name: NAMES[userIndex],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],

      // Uncomment below and refresh to see with avatar graphics
      // picture: `https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`,
    },
  });
  return NextResponse.json(JSON.parse(result.body));
}

const NAMES = [
  "Charlie Layne",
  "Mislav Abha",
  "Tatum Paolo",
  "Anjali Wanda",
  "Jody Hekla",
  "Emil Joyce",
  "Jory Quispe",
  "Quinn Elton",
];

const COLORS = [
  ["#FF0099", "#FF7A00"],
  ["#002A95", "#00A0D2"],
  ["#6116FF", "#E32DD1"],
  ["#0EC4D1", "#1BCC00"],
  ["#FF00C3", "#FF3333"],
  ["#00C04D", "#00FFF0"],
  ["#5A2BBE", "#C967EC"],
  ["#46BE2B", "#67EC86"],
  ["#F49300", "#FFE600"],
  ["#F42900", "#FF9000"],
  ["#00FF94", "#0094FF"],
  ["#00FF40", "#1500FF"],
  ["#00FFEA", "#BF00FF"],
  ["#FFD600", "#BF00FF"],
  ["#484559", "#282734"],
  ["#881B9A", "#1D051E"],
  ["#FF00F5", "#00FFD1"],
  ["#9A501B", "#1E0505"],
  ["#FF008A", "#FAFF00"],
  ["#22BC09", "#002B1B"],
  ["#FF0000", "#000000"],
  ["#00FFB2", "#000000"],
  ["#0066FF", "#000000"],
  ["#FA00FF", "#000000"],
  ["#00A3FF", "#000000"],
  ["#00FF94", "#000000"],
  ["#AD00FF", "#000000"],
  ["#F07777", "#4E0073"],
  ["#AC77F0", "#003C73"],
];
