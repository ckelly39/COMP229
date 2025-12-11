import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('Home Component', () => {
  // Helper function to render Home with Router
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  it('renders the welcome heading', () => {
    renderHome();
    const heading = screen.getByRole('heading', { name: /welcome to my portfolio/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the mission statement section', () => {
    renderHome();
    const missionHeading = screen.getByRole('heading', { name: /my mission/i });
    expect(missionHeading).toBeInTheDocument();
    
    const missionText = screen.getByText(/I strive to create innovative solutions/i);
    expect(missionText).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderHome();
    
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    const servicesLink = screen.getByRole('link', { name: /our services/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });
    
    expect(aboutLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it('has correct navigation links hrefs', () => {
    renderHome();
    
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    const servicesLink = screen.getByRole('link', { name: /our services/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });
    
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(servicesLink).toHaveAttribute('href', '/services');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('contains the home-container div', () => {
    const { container } = renderHome();
    const homeContainer = container.querySelector('.home-container');
    expect(homeContainer).toBeInTheDocument();
  });

  it('contains the mission-statement div', () => {
    const { container } = renderHome();
    const missionStatement = container.querySelector('.mission-statement');
    expect(missionStatement).toBeInTheDocument();
  });
});
