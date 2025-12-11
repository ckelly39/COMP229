import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../components/contact';

describe('Contact Component', () => {
  it('renders the contact heading', () => {
    render(<Contact />);
    const heading = screen.getByRole('heading', { name: /contact information/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays contact details', () => {
    render(<Contact />);
    expect(screen.getByText(/Kelly Cyusa/i)).toBeInTheDocument();
    expect(screen.getByText(/ckelly39@my.centennialcollege.ca/i)).toBeInTheDocument();
    expect(screen.getByText(/\(437\) 609-5923/i)).toBeInTheDocument();
    expect(screen.getByText(/94 Paul Rouge, Toronto, ON/i)).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Contact />);
    const linkedInLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kelly-cyusa');
    
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ckelly39');
  });

  it('renders the contact form with all fields', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('allows user to type in form fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john.doe@example.com');
    
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    
    // Mock console.log instead of alert
    const consoleLogSpy = vi.spyOn(console, 'log');
    window.alert = vi.fn();
    
    render(<Contact />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    await user.type(firstNameInput, 'Jane');
    await user.type(lastNameInput, 'Smith');
    await user.type(emailInput, 'jane@example.com');
    await user.type(messageInput, 'Test message');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalled();
    });
    
    consoleLogSpy.mockRestore();
  });

  it('clears form after submission', async () => {
    const user = userEvent.setup();
    const consoleLogSpy = vi.spyOn(console, 'log');
    window.alert = vi.fn();
    
    render(<Contact />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    await user.type(firstNameInput, 'Test');
    await user.type(lastNameInput, 'User');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Test message');
    
    expect(firstNameInput).toHaveValue('Test');
    
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
    
    consoleLogSpy.mockRestore();
  });

  it('has required fields', () => {
    render(<Contact />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    
    expect(firstNameInput).toBeRequired();
    expect(lastNameInput).toBeRequired();
  });
});
