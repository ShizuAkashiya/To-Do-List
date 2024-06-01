document.addEventListener('DOMContentLoaded', function() {
    let points = 0;
    const newTaskInput = document.getElementById('new-task');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const completedTasks = document.getElementById('completed-tasks');
    const deletedTasks = document.getElementById('deleted-tasks');
    const changedStatusTasks = document.getElementById('changed-status-tasks');
    const pointsDisplay = document.getElementById('points');
  
    addTaskBtn.addEventListener('click', addTask);
  
    function addTask() {
      const taskText = newTaskInput.value.trim();
      const taskDeadline = taskDeadlineInput.value;
  
      if (taskText !== '' && taskDeadline !== '') {
        const li = document.createElement('li');
        const deadlineDate = new Date(taskDeadline);
        li.innerHTML = `
          <span class="task-text">${taskText}</span>
          <span class="task-deadline">${deadlineDate.toLocaleString()}</span>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          <button class="complete-btn">Complete</button>
        `;
        taskList.appendChild(li);
        newTaskInput.value = '';
        taskDeadlineInput.value = '';
  
        li.querySelector('.edit-btn').addEventListener('click', function() {
          const newText = prompt('Edit task:', taskText);
          if (newText) {
            const newDeadline = prompt('Edit deadline (format: YYYY-MM-DDTHH:MM):', deadlineDate.toISOString().slice(0,16));
            const newDeadlineDate = new Date(newDeadline);
            if (newDeadline) {
              li.querySelector('.task-text').textContent = newText;
              li.querySelector('.task-deadline').textContent = newDeadlineDate.toLocaleString();
              changedStatusTasks.appendChild(li);
            }
          }
        });
  
        li.querySelector('.delete-btn').addEventListener('click', function() {
          const deleteDate = new Date();
          li.innerHTML += `<span class="task-deleted">Deleted on: ${deleteDate.toLocaleString()}</span>`;
          deletedTasks.appendChild(li);
          removeButtons(li);
        });
  
        li.querySelector('.complete-btn').addEventListener('click', function() {
          const completeDate = new Date();
          li.classList.add('completed');
          li.querySelector('.edit-btn').remove();
          li.querySelector('.delete-btn').remove();
          li.querySelector('.complete-btn').remove();
          li.innerHTML += `<span class="task-completed">Completed on: ${completeDate.toLocaleString()}</span>`;
          completedTasks.appendChild(li);
          updatePoints(5);
        });
  
        setReminder(li, deadlineDate);
      }
    }
  
    function updatePoints(amount) {
      points += amount;
      pointsDisplay.textContent = points;
      if (points >= 5) {
        enableCustomization();
      }
    }
  
    function enableCustomization() {
      const customizeBtn = document.createElement('button');
      customizeBtn.className = 'customize-btn';
      customizeBtn.textContent = 'Customize Background';
      customizeBtn.addEventListener('click', function() {
        const color = prompt('Enter a background color (e.g., #ff0000 or red):');
        if (color) {
          document.body.style.backgroundColor = color;
        }
      });
      document.body.appendChild(customizeBtn);
    }
  
    function setReminder(taskElement, deadlineDate) {
      const reminderTime = new Date(deadlineDate.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days sebelum deadline
      const now = new Date();
  
      if (reminderTime > now) {
        const timeUntilReminder = reminderTime.getTime() - now.getTime();
        setTimeout(function() {
          alert(`Reminder: Your task "${taskElement.querySelector('.task-text').textContent}" is due in 3 days!`);
          taskElement.style.backgroundColor = '#fff3cd'; // highlight kuning
        }, timeUntilReminder);
      }
    }
  
    function removeButtons(taskElement) {
      const buttons = taskElement.querySelectorAll('button');
      buttons.forEach(button => button.remove());
    }
  });
  