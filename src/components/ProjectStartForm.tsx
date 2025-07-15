import React, { useState } from 'react';
import { X, Rocket, Calendar, DollarSign, User, FileText } from 'lucide-react';
import { useToast } from './NotificationToast';
import LoadingSpinner from './LoadingSpinner';

interface ProjectFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectTitle: string;
  projectDescription: string;
  budget: string;
  startDate: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requirements: string;
  goals: string;
  constraints: string;
  stakeholders: string;
  communicationPreference: 'email' | 'phone' | 'video' | 'in-person';
  meetingAvailability: string[];
}

interface ProjectStartFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectStartForm: React.FC<ProjectStartFormProps> = ({ isOpen, onClose }) => {
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    startDate: '',
    deadline: '',
    priority: 'medium',
    requirements: '',
    goals: '',
    constraints: '',
    stakeholders: '',
    communicationPreference: 'email',
    meetingAvailability: []
  });

  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000',
    'To be discussed'
  ];

  const availabilityOptions = [
    'Weekday mornings (9AM-12PM)',
    'Weekday afternoons (12PM-5PM)',
    'Weekday evenings (5PM-8PM)',
    'Weekend mornings',
    'Weekend afternoons',
    'Flexible schedule'
  ];

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvailabilityToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      meetingAvailability: prev.meetingAvailability.includes(option)
        ? prev.meetingAvailability.filter(a => a !== option)
        : [...prev.meetingAvailability, option]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    if (!formData.budget) newErrors.budget = 'Budget range is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.goals.trim()) newErrors.goals = 'Project goals are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the project start request to your backend
      console.log('Project start request submitted:', formData);
      
      success('Project request submitted successfully! Our team will contact you within 24 hours to discuss next steps.');
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectTitle: '',
        projectDescription: '',
        budget: '',
        startDate: '',
        deadline: '',
        priority: 'medium',
        requirements: '',
        goals: '',
        constraints: '',
        stakeholders: '',
        communicationPreference: 'email',
        meetingAvailability: []
      });
    } catch (err) {
      error('Failed to submit project request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-3 rounded-xl">
              <Rocket className="h-6 w-6 text-teal-700" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Start Your Project</h2>
              <p className="text-sm text-gray-600">Let's bring your vision to life</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Contact Information */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization (Optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => handleChange('projectTitle', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.projectTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Modern Office Furniture Design"
                />
                {errors.projectTitle && <p className="text-red-500 text-sm mt-1">{errors.projectTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleChange('projectDescription', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Provide a detailed description of your project, including scope, requirements, and any specific needs..."
                />
                {errors.projectDescription && <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Goals & Objectives *
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => handleChange('goals', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.goals ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="What do you hope to achieve with this project? What are your main objectives?"
                />
                {errors.goals && <p className="text-red-500 text-sm mt-1">{errors.goals}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleChange('requirements', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Any specific technical requirements, materials, dimensions, or constraints..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Constraints & Limitations (Optional)
                </label>
                <textarea
                  value={formData.constraints}
                  onChange={(e) => handleChange('constraints', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Any budget, time, space, or other constraints we should be aware of..."
                />
              </div>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Timeline & Budget</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range *
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.budget ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>
          </div>

          {/* Communication Preferences */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <DollarSign className="h-5 w-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Communication Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Communication Method
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'video', label: 'Video Call' },
                    { value: 'in-person', label: 'In-Person' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        value={option.value}
                        checked={formData.communicationPreference === option.value}
                        onChange={(e) => handleChange('communicationPreference', e.target.value)}
                        className="mr-2 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Meeting Availability (select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availabilityOptions.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.meetingAvailability.includes(option)}
                        onChange={() => handleAvailabilityToggle(option)}
                        className="mr-2 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Stakeholders (Optional)
                </label>
                <input
                  type="text"
                  value={formData.stakeholders}
                  onChange={(e) => handleChange('stakeholders', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Names and roles of people who should be involved in the project..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <>
                  <Rocket className="h-6 w-6" />
                  <span>Launch Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectStartForm;