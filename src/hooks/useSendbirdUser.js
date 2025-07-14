import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const SENDBIRD_API_URL = "https://api-46eec2e6-cebf-484e-9cf9-17f4ed206c08.sendbird.com/v3/users";
const SENDBIRD_API_TOKEN = import.meta.env.VITE_SENDBIRD_API_TOKEN;

function useSendbirdUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.id) return;

    const registerUser = async () => {
      const userId = user.id; 
      const nickname = user.fullName || user.username || "Korisnik";
      const profileUrl = user.imageUrl || "";

      try {
        const response = await fetch(SENDBIRD_API_URL, {
          method: "POST",
          headers: {
            "Api-Token": SENDBIRD_API_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            nickname,
            profile_url: profileUrl,
          }),
        });

        const data = await response.json();

        if (!response.ok && data.code !== 400202) {
          console.error("❌ Greška pri registraciji u Sendbirdu:", data);
        } else {
          console.log("✅ Sendbird korisnik registriran ili već postoji:", userId);
        }
      } catch (error) {
        console.error("🌐 Network greška pri registraciji u Sendbirdu:", error);
      }
    };

    registerUser();
  }, [user]);
}

export default useSendbirdUser;
