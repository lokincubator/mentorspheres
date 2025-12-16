import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../ui/Card';
import Button from '../ui/Button';

export interface MentorSummary {
  id: string | number;
  name?: string;
  avatarUrl?: string;
  title?: string;
  expertise?: string[];
  location?: string;
  bio?: string;
}

interface MentorCardProps {
  mentor: MentorSummary;
  className?: string;
}

const initials = (name?: string) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
};

const MentorCard: React.FC<MentorCardProps> = ({ mentor, className }) => {
  return (
    <Card className={['p-0', className].filter(Boolean).join(' ')}>
      <CardBody>
        <div className="flex items-center gap-4">
          {mentor.avatarUrl ? (
            <img
              src={mentor.avatarUrl}
              alt={mentor.name ?? 'Mentor avatar'}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
              {initials(mentor.name)}
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-sm font-semibold">{mentor.name ?? '—'}</h3>
            <p className="text-xs text-gray-500 mt-1">{mentor.title ?? ''}</p>
            {mentor.location && <p className="text-xs text-gray-400 mt-1">{mentor.location}</p>}
          </div>
        </div>

        {mentor.bio && <p className="mt-4 text-sm text-gray-600 line-clamp-3">{mentor.bio}</p>}

        <div className="mt-4 flex justify-end">
          <Link to={`/profile/${mentor.id}`}>
            <Button size="small" variant="outlined" color="primary">View profile</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default MentorCard;

