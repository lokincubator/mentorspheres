// src/pages/ProfilePage.tsx
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/apis/ApiBase';
import { PROFILE_DETAIL_API } from '../constants/api';
import { errorHandling } from '../utils/utils';

type Profile = {
  id: string | number;
  name?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  status?: string;
  personality?: string[];
  coreNeeds?: string[]; // from API
  frustrations?: string[]; // from API
  brands?: string[] | string; // from API (tags array or free text)
};

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  async function fetchProfile() {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
        const res = await API.get(PROFILE_DETAIL_API(id));
        const raw: any = res.data;
        const normalized: Profile = {
          id: raw?.id ?? id,
          name: raw?.name ?? raw?.full_name ?? raw?.username,
          email: raw?.email,
          avatarUrl: raw?.avatarUrl ?? raw?.avatar_url ?? raw?.avatar,
          bio: raw?.bio,
          location: raw?.location,
          status: raw?.status,
          personality: Array.isArray(raw?.personality) ? raw.personality : [],
          coreNeeds: Array.isArray(raw?.coreNeeds)
            ? raw.coreNeeds
            : Array.isArray(raw?.core_needs)
            ? raw.core_needs
            : [],
          frustrations: Array.isArray(raw?.frustrations)
            ? raw.frustrations
            : Array.isArray(raw?.pain_points)
            ? raw.pain_points
            : [],
          brands: Array.isArray(raw?.brands) || typeof raw?.brands === 'string' ? raw.brands : [],
        };
        setProfile(normalized);
    } catch (e: any) {
        setError(errorHandling(e, 'Failed to load profile'));
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!id) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <p className="text-red-600">Missing profile id in route.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-center text-2xl font-semibold mb-6">Personal Profile</h1>

        {loading && (
          <div className="text-center text-gray-500">Loading profile…</div>
        )}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Left column: basic info */}
            <section className="md:col-span-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100" aria-hidden>
                  {profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <h2 className="mt-3 text-lg font-medium">{profile?.name ?? '—'}</h2>
                <p className="text-sm text-gray-500">{profile?.email ?? '—'}</p>
              </div>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="font-medium">{profile?.status ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium">{profile?.location ?? '—'}</dd>
                </div>
              </dl>

              {Array.isArray(profile?.personality) && profile!.personality!.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-semibold">Personality</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile!.personality!.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Right column: details */}
            <section className="md:col-span-2 space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold">Bio</h3>
                <p className="text-sm text-gray-700">
                  {profile?.bio ?? '—'}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold">Core needs</h3>
                {Array.isArray(profile?.coreNeeds) && profile!.coreNeeds!.length > 0 ? (
                  <ul className="list-inside list-disc text-sm text-gray-700 space-y-1">
                    {profile!.coreNeeds!.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">—</p>
                )}
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold">Frustrations</h3>
                {Array.isArray(profile?.frustrations) && profile!.frustrations!.length > 0 ? (
                  <ul className="list-inside list-disc text-sm text-gray-700 space-y-1">
                    {profile!.frustrations!.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">—</p>
                )}
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-sm font-semibold">Brands</h3>
                {Array.isArray(profile?.brands) ? (
                  profile!.brands!.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile!.brands!.map((b, idx) => (
                        <span key={idx} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs">
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">—</p>
                  )
                ) : typeof profile?.brands === 'string' && profile?.brands?.trim() ? (
                  <p className="text-sm text-gray-700">{profile!.brands as string}</p>
                ) : (
                  <p className="text-sm text-gray-500">—</p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
