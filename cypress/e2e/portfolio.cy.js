describe('Portfolio E2E Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/')
  })

  describe('Home Page', () => {
    it('should load the home page successfully', () => {
      cy.contains('Welcome to My Portfolio').should('be.visible')
      cy.contains('My Mission').should('be.visible')
    })

    it('should display mission statement', () => {
      cy.contains('I strive to create innovative solutions').should('be.visible')
    })

    it('should have navigation buttons', () => {
      cy.contains('About Us').should('be.visible')
      cy.contains('Our Services').should('be.visible')
      cy.contains('Contact').should('be.visible')
    })
  })

  describe('Navigation', () => {
    it('should navigate to About page', () => {
      cy.contains('About Us').click()
      cy.url().should('include', '/about')
      cy.contains('Kelly Cyusa').should('be.visible')
    })

    it('should navigate to Services page', () => {
      cy.contains('Our Services').click()
      cy.url().should('include', '/services')
    })

    it('should navigate to Contact page', () => {
      cy.contains('Contact').click()
      cy.url().should('include', '/contact')
      cy.contains('Contact Information').should('be.visible')
    })

    it('should navigate between multiple pages', () => {
      // Home -> About
      cy.contains('About Us').click()
      cy.url().should('include', '/about')
      
      // About -> Services (if navigation exists)
      cy.visit('/services')
      cy.url().should('include', '/services')
      
      // Services -> Contact
      cy.visit('/contact')
      cy.url().should('include', '/contact')
      
      // Contact -> Home
      cy.visit('/')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  describe('About Page', () => {
    beforeEach(() => {
      cy.visit('/about')
    })

    it('should display profile information', () => {
      cy.contains('Kelly Cyusa').should('be.visible')
      cy.contains('software engineering student').should('be.visible')
      cy.contains('Artificial Intelligence').should('be.visible')
    })

    it('should have a profile image', () => {
      cy.get('img[alt*="profile"]').should('exist')
    })

    it('should have a resume link', () => {
      cy.contains('View PDF version')
        .should('have.attr', 'href', '/resume.pdf')
        .should('have.attr', 'target', '_blank')
    })

    it('should mention CIMT College', () => {
      cy.contains('CIMT College').should('be.visible')
    })
  })

  describe('Contact Page', () => {
    beforeEach(() => {
      cy.visit('/contact')
    })

    it('should display contact information', () => {
      cy.contains('Kelly Cyusa').should('be.visible')
      cy.contains('ckelly39@my.centennialcollege.ca').should('be.visible')
      cy.contains('(437) 609-5923').should('be.visible')
      cy.contains('94 Paul Rouge, Toronto, ON').should('be.visible')
    })

    it('should display social media links', () => {
      cy.contains('a', 'LinkedIn')
        .should('have.attr', 'href')
        .and('include', 'linkedin.com')
      
      cy.contains('a', 'GitHub')
        .should('have.attr', 'href')
        .and('include', 'github.com')
    })

    it('should have a contact form', () => {
      cy.contains('Send Me a Message').should('be.visible')
      cy.get('input[name="firstName"]').should('exist')
      cy.get('input[name="lastName"]').should('exist')
      cy.get('input[name="contactNumber"]').should('exist')
      cy.get('input[name="emailAddress"]').should('exist')
      cy.get('textarea[name="message"]').should('exist')
      cy.get('button[type="submit"]').should('exist')
    })

    it('should allow user to fill out the form', () => {
      cy.get('input[name="firstName"]').type('John')
      cy.get('input[name="lastName"]').type('Doe')
      cy.get('input[name="contactNumber"]').type('123-456-7890')
      cy.get('input[name="emailAddress"]').type('john.doe@example.com')
      cy.get('textarea[name="message"]').type('This is a test message for the E2E testing.')
      
      // Verify values
      cy.get('input[name="firstName"]').should('have.value', 'John')
      cy.get('input[name="lastName"]').should('have.value', 'Doe')
      cy.get('input[name="emailAddress"]').should('have.value', 'john.doe@example.com')
    })

    it('should submit the form successfully', () => {
      // Fill out the form
      cy.get('input[name="firstName"]').type('Jane')
      cy.get('input[name="lastName"]').type('Smith')
      cy.get('input[name="contactNumber"]').type('987-654-3210')
      cy.get('input[name="emailAddress"]').type('jane.smith@example.com')
      cy.get('textarea[name="message"]').type('Testing form submission')
      
      // Submit the form
      cy.get('button[type="submit"]').click()
      
      // Check for alert (stub it to prevent actual alert)
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Thank you for your message')
      })
      
      // Form should be cleared after submission
      cy.get('input[name="firstName"]').should('have.value', '')
      cy.get('input[name="lastName"]').should('have.value', '')
      cy.get('input[name="emailAddress"]').should('have.value', '')
    })

    it('should validate required fields', () => {
      // Try to submit without filling required fields
      cy.get('button[type="submit"]').click()
      
      // Check that form validation prevents submission
      cy.get('input[name="firstName"]:invalid').should('exist')
      cy.get('input[name="lastName"]:invalid').should('exist')
    })
  })

  describe('Responsive Design', () => {
    const viewports = [
      { device: 'iphone-6', width: 375, height: 667 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'macbook-15', width: 1440, height: 900 }
    ]

    viewports.forEach((viewport) => {
      it(`should display correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/')
        cy.contains('Welcome to My Portfolio').should('be.visible')
      })
    })
  })

  describe('Application Functionality', () => {
    it('should have working links throughout the application', () => {
      cy.visit('/')
      
      // Test all navigation links work
      cy.get('a').each(($link) => {
        const href = $link.prop('href')
        
        // Skip external links and anchor links
        if (href && !href.includes('http') && !href.includes('#')) {
          cy.request(href).its('status').should('eq', 200)
        }
      })
    })

    it('should load all pages without errors', () => {
      const pages = ['/', '/about', '/services', '/contact']
      
      pages.forEach((page) => {
        cy.visit(page)
        cy.url().should('include', page)
      })
    })
  })
})
