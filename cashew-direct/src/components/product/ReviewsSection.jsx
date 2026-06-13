import { useState } from 'react';
import { ShieldCheck, Star } from 'lucide-react';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { Textarea } from '../ui/Input';
import { formatDate } from '../../lib/format';
import { useToast } from '../../context/ToastContext';

function getDistribution(rating) {
  if (rating >= 4.7) return [78, 15, 4, 2, 1];
  if (rating >= 4.3) return [60, 25, 8, 4, 3];
  if (rating >= 4.0) return [45, 30, 15, 6, 4];
  return [30, 30, 20, 12, 8];
}

function WriteReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Your rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              aria-label={`Rate ${i} stars`}
            >
              <Star
                className={`h-7 w-7 transition ${
                  i <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="review-title" className="mb-1.5 block text-sm font-medium text-gray-700">
          Review title
        </label>
        <input
          id="review-title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="h-11 w-full rounded-lg border border-gray-300 px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
        />
      </div>
      <div>
        <label htmlFor="review-body" className="mb-1.5 block text-sm font-medium text-gray-700">
          Your review
        </label>
        <Textarea
          id="review-body"
          required
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What did you like or dislike?"
        />
      </div>
      <Button type="submit" fullWidth>
        Submit Review
      </Button>
    </form>
  );
}

export default function ReviewsSection({ product, reviews }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();
  const distribution = getDistribution(product.rating);

  function handleSubmitReview() {
    setModalOpen(false);
    showToast('Thanks! Your review has been submitted for approval.');
  }

  return (
    <div id="reviews" className="grid gap-10 lg:grid-cols-[320px_1fr]">
      {/* Summary */}
      <div>
        <div className="flex items-center gap-4">
          <span className="text-5xl font-extrabold tracking-tight text-gray-900">{product.rating.toFixed(1)}</span>
          <div>
            <Rating value={product.rating} size="md" />
            <p className="mt-1 text-sm text-gray-500">{product.reviewCount.toLocaleString()} reviews</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {distribution.map((pct, i) => {
            const stars = 5 - i;
            return (
              <div key={stars} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-10 shrink-0">{stars} star</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 shrink-0 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>

        <Button variant="outline" fullWidth className="mt-6" onClick={() => setModalOpen(true)}>
          Write a Review
        </Button>
      </div>

      {/* Review list */}
      <div className="flex flex-col divide-y divide-gray-100">
        {reviews.map((review) => (
          <div key={review.id} className="py-5 first:pt-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                  {review.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{formatDate(new Date(Date.now() - review.daysAgo * 86400000).toISOString())}</p>
                </div>
              </div>
              {review.verified && (
                <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Purchase
                </span>
              )}
            </div>
            <Rating value={review.rating} className="mt-3" />
            <h4 className="mt-2 text-sm font-semibold text-gray-900">{review.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{review.body}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Write a Review">
        <WriteReviewForm onSubmit={handleSubmitReview} />
      </Modal>
    </div>
  );
}
