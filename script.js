import { displayFilteredProjects } from './project.js';
import { addProjectForm } from './formhandler.js';
import { generateCSRFToken } from './security.js';

let allProjects = [];
window.allProjects = allProjects;
function filterProjects(category) {
  try {
      const filtered = allProjects.filter(p => category === 'All' || p.category === category);
      displayFilteredProjects(filtered);
  } catch (error) {
      console.error('Error filtering projects:', error);
  }
}
window.filterProjects = filterProjects;
// Sprint A3 Part 1: Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', async () => {
    try {
      console.log('🚀 Portfolio Project Loaded');

      generateCSRFToken();
      addProjectForm();
  
      // 📦 Sprint B3: Dynamic data loaded from JSON using fetch()
      const response = await fetch('projects.json');
      if (!response.ok) {
        throw new Error('Failed to fetch project data.');
      }      
      
      allProjects = await response.json();
      console.log("Projects:");
      allProjects.forEach((project) => {
        try {
          console.log(`ID: ${project.id}`);
          console.log(`Title: ${project.title}`);
          console.log(`Category: ${project.category}`);
          console.log(`Description: ${project.description}`);
          console.log(`Technologies Used: ${project.techStack.join(", ")}`);
          console.log(`Image: ${project.image}`);
          console.log("--------------------");
        } catch (err) {
          console.error("Error logging project info:", err);
        }
      });
      displayFilteredProjects(allProjects);
  
      const dropdown = document.getElementById('filterDropdown');
      if (dropdown) {
        dropdown.addEventListener('change', (e) => filterProjects(e.target.value));
      }
  

} catch (error) {
    console.error('Error during page initialization:', error);
}
});