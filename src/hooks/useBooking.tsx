import { useState } from 'react';
import QuoteRequestForm from '../components/QuoteRequestForm';
import ProjectStartForm from '../components/ProjectStartForm';
import BookingCalendar from '../components/BookingCalendar';

export const useBooking = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const openQuoteForm = () => setShowQuoteForm(true);
  const closeQuoteForm = () => setShowQuoteForm(false);

  const openProjectForm = () => setShowProjectForm(true);
  const closeProjectForm = () => setShowProjectForm(false);

  const openConsultationForm = () => setShowConsultationForm(true);
  const closeConsultationForm = () => setShowConsultationForm(false);

  const BookingComponents = () => (
    <>
      <QuoteRequestForm isOpen={showQuoteForm} onClose={closeQuoteForm} />
      <ProjectStartForm isOpen={showProjectForm} onClose={closeProjectForm} />
      <BookingCalendar isOpen={showConsultationForm} onClose={closeConsultationForm} type="consultation" />
    </>
  );

  return {
    openQuoteForm,
    openProjectForm,
    openConsultationForm,
    BookingComponents
  };
};