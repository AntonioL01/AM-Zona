import { App as SendbirdApp } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';

function Inbox() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("recipient");
  const [channelUrl, setChannelUrl] = useState(null);
  const [sbInstance, setSbInstance] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      if (!user || !recipientId || user.id === recipientId) return;

      try {
        const sb = await SendbirdChat.init({
          appId: import.meta.env.VITE_SENDBIRD_APP_ID,
          modules: [new GroupChannelModule()],
        });

        console.log("✅ Pokrećem initChat...");
        console.log("👤 Prijavljeni korisnik:", user.id);
        console.log("🎯 Primatelj (recipientId):", recipientId);

        await sb.connect(user.id);
        setSbInstance(sb);
        console.log("🔗 Spajam se na Sendbird kao:", user.id);

        const params = {
          invitedUserIds: [recipientId],
          isDistinct: true,
        };

        const channel = await sb.groupChannel.createChannel(params);
        console.log("✅ Kanal kreiran:", channel.url);
        setChannelUrl(channel.url);
      } catch (error) {
        console.error("❌ Greška pri inicijalizaciji chata:", error);
      }
    };

    initChat();

    return () => {
      if (sbInstance?.disconnect) {
        sbInstance.disconnect();
      }
    };
  }, [user, recipientId]);

  if (!user) return <p className="text-center p-6">Učitavanje korisnika...</p>;
  if (recipientId && !channelUrl) return <p className="text-center p-6">Otvaranje razgovora...</p>;

  return (
    <div className="min-h-screen bg-zinc-200 text-zinc-900 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-zinc-100 rounded-xl shadow-md p-4">
        <div style={{ height: '85vh' }}>
          <SendbirdApp
            appId={import.meta.env.VITE_SENDBIRD_APP_ID}
            userId={user.id}
            nickname={user.fullName || user.username || "Korisnik"}
            channelUrl={recipientId ? channelUrl : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default Inbox;
