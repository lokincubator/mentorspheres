import React, { useEffect, useState } from 'react';
import API from '../utils/apis/ApiBase';
import { MENTORS_API } from '../constants/api';
import { Container } from '../components/ui/Container';
import MentorCard, { MentorSummary } from '../components/mentors/MentorCard';
import { Card } from '../components/ui/Card';

const MentorsPage: React.FC = () => {
  const [mentors, setMentors] = useState<MentorSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get(MENTORS_API);
      const data = res?.data;
      // Expect an array; normalize to MentorSummary
      const list: MentorSummary[] = Array.isArray(data)
        ? data.map((it: any) => ({
            id: it.id ?? it._id ?? '',
            name: it.name ?? it.full_name ?? it.username ?? '',
            avatarUrl: it.avatar || it.avatar_url || it.profile_image || '',
            title: it.title || it.role || it.occupation || '',
            expertise: Array.isArray(it.expertise) ? it.expertise : (it.expertise ? [it.expertise] : []),
            location: it.location || it.city || '',
            bio: it.bio || it.description || '',
          }))
        : [];

      setMentors(list);
    } catch (err: any) {
      setError(err?.message || 'Failed to load mentors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <main className="flex-1">
      <Container className="py-8">
        <h1 className="text-2xl font-semibold text-center mb-6">All Mentors</h1>

        {loading && <p className="text-center">Loading mentors…</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && mentors.length === 0 && (
          <Card>
            <div className="p-6 text-center">No mentors found.</div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default MentorsPage;
