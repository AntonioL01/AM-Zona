import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { App as SendbirdApp } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useSearchParams } from 'react-router-dom';

const APP_ID = import.meta.env.VITE_SENDBIRD_APP_ID;

export default function Inbox() {
  const { isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("recipient");

  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const inicijalizirajSendbird = async () => {
      try {
        if (recipientId && recipientId === user.id) {
          setError("Ne možete poslati poruku samom sebi.");
          setLoading(false);
          return;
        }

        const clerkToken = await getToken({ template: 'sendbird-user' });

        const response = await fetch('/.netlify/functions/sendbird-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${clerkToken}`
          },
          body: JSON.stringify({
            userId: user.id,
            nickname: user.fullName || user.username,
            profileUrl: user.imageUrl
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Greška servera: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        setSessionToken(data.user.session_token);

      } catch (err) {
        console.error('Greška pri spajanju na Sendbird:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    inicijalizirajSendbird();
  }, [isLoaded, user, recipientId, getToken]);

  if (loading) return <p className="text-center p-6">Učitavanje chata...</p>;
  if (error) return <p className="text-center p-6">Greška: {error}</p>;
  if (!sessionToken) return <p className="text-center p-6">Pristup chatu nije moguć.</p>;

  return (
    <div className="min-h-screen bg-zinc-200 text-zinc-900 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-zinc-100 rounded-xl shadow-md p-4">
        <div style={{ height: '85vh' }}>
          <SendbirdApp
            appId={APP_ID}
            userId={user.id}
            nickname={user.fullName || user.username || "Korisnik"}
            accessToken={sessionToken}
            channelUrl={recipientId || undefined}
          />
        </div>
      </div>
    </div>
  );
}
