import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../components/about';

describe('About Component', () => {
  it('renders the profile name', () => {
    render(<About />);
    const nameHeading = screen.getByRole('heading', { name: /kelly cyusa/i });
    expect(nameHeading).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<About />);
    const profileImage = screen.getByRole('img', { name: /kelly cyusa profile/i });
    expect(profileImage).toBeInTheDocument();
    // OptimizedImage initially shows placeholder, then loads actual image
    expect(profileImage).toHaveAttribute('src');
  });

  it('renders the bio text', () => {
    render(<About />);
    const bioText = screen.getByText(/I'm a passionate software engineering student/i);
    expect(bioText).toBeInTheDocument();
  });

  it('contains information about AI specialization', () => {
    render(<About />);
    const aiText = screen.getByText(/specializing in Artificial Intelligence/i);
    expect(aiText).toBeInTheDocument();
  });

  it('mentions CIMT College experience', () => {
    render(<About />);
    const cimtText = screen.getByText(/CIMT College/i);
    expect(cimtText).toBeInTheDocument();
  });

  it('renders the resume link', () => {
    render(<About />);
    const resumeLink = screen.getByRole('link', { name: /view pdf version/i });
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute('href', '/resume.pdf');
    expect(resumeLink).toHaveAttribute('target', '_blank');
  });

  it('has correct CSS classes', () => {
    const { container } = render(<About />);
    expect(container.querySelector('.about-section')).toBeInTheDocument();
    expect(container.querySelector('.profile-image')).toBeInTheDocument();
    expect(container.querySelector('.profile-name')).toBeInTheDocument();
    expect(container.querySelector('.bio')).toBeInTheDocument();
  });

  it('contains weather prediction project mention', () => {
    render(<About />);
    const projectText = screen.getByText(/weather prediction prototype/i);
    expect(projectText).toBeInTheDocument();
  });
});
