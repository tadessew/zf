import React, { useState, useEffect } from 'react';
import { X, Save, Briefcase, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    beforeImage: '',
    afterImage: '',
    cost: 0,
    materials: '',
    duration: '',
    testimonial: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const durationOptions = [
    '1 week',
    '2 weeks',
    '3 weeks',
    '1 month',
    '6 weeks',
    '2 months',
    '3 months',
    '4 months',
    '6 months',
    '1 year'
  ];

  const materialSuggestions = [
    'Oak Wood, Leather, Steel',
    'Walnut Wood, Glass, Metal',
    'Italian Leather, Hardwood',
    'Reclaimed Wood, Iron',
    'Teak Wood, Brass, Fabric',
    'Pine Wood, Stainless Steel',
    'Bamboo, Natural Fiber',
    'MDF, Veneer, Aluminum'
  ];

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        beforeImage: project.beforeImage || '',
        afterImage: project.afterImage || '',
        cost: project.cost || 0,
        materials: project.materials || '',
        duration: project.duration || '',
        testimonial: project.testimonial || '',
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.beforeImage.trim()) newErrors.beforeImage = 'Before image URL is required';
    if (!formData.afterImage.trim()) newErrors.afterImage = 'After image URL is required';
    if (formData.cost <= 0) newErrors.cost = 'Cost must be greater than 0';
    if (!formData.materials.trim()) newErrors.materials = 'Materials are required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (project) {
      updateProject(project.id, formData);
    } else {
      addProject(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-teal-700" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Modern Living Room Makeover"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Before & After Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="beforeImage" className="block text-sm font-medium text-gray-700 mb-2">
                Before Image URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="beforeImage"
                  name="beforeImage"
                  value={formData.beforeImage}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.beforeImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://images.pexels.com/..."
                />
                <Upload className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.beforeImage && <p className="text-red-500 text-sm mt-1">{errors.beforeImage}</p>}
              {formData.beforeImage && (
                <div className="mt-3">
                  <img
                    src={formData.beforeImage}
                    alt="Before preview"
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={() => setErrors(prev => ({ ...prev, beforeImage: 'Invalid image URL' }))}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="afterImage" className="block text-sm font-medium text-gray-700 mb-2">
                After Image URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="afterImage"
                  name="afterImage"
                  value={formData.afterImage}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.afterImage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://images.pexels.com/..."
                />
                <Upload className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.afterImage && <p className="text-red-500 text-sm mt-1">{errors.afterImage}</p>}
              {formData.afterImage && (
                <div className="mt-3">
                  <img
                    src={formData.afterImage}
                    alt="After preview"
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={() => setErrors(prev => ({ ...prev, afterImage: 'Invalid image URL' }))}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Cost & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                Total Cost ($) *
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.cost ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="15000"
              />
              {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Project Duration *
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select duration</option>
                {durationOptions.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>
          </div>

          {/* Materials */}
          <div>
            <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mb-2">
              Materials Used *
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.materials ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Italian Leather, Oak Wood, Steel"
            />
            {errors.materials && <p className="text-red-500 text-sm mt-1">{errors.materials}</p>}
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {materialSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, materials: suggestion }))}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Detailed description of the project, challenges, solutions, and outcomes..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Client Testimonial */}
          <div>
            <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-2">
              Client Testimonial (Optional)
            </label>
            <textarea
              id="testimonial"
              name="testimonial"
              value={formData.testimonial}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="What did the client say about the project? (This will be displayed as a quote)"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{project ? 'Update' : 'Create'} Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;