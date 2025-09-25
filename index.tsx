/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

type Status = 'pending' | 'in-progress' | 'completed';

interface ChecklistItem {
  title: string;
  description: string;
  status: Status;
}

const productionSteps: ChecklistItem[] = [
  {
    title: 'Seguro Arte',
    description: 'Transferendo para o designer.',
    status: 'pending',
  },
  {
    title: 'Preparação da Arte',
    description: 'Nossa equipe de design está preparando sua arte para impressão.',
    status: 'pending',
  },
  {
    title: 'Aprovação da Arte',
    description: 'Arte aprovada.',
    status: 'pending',
  },
  {
    title: 'Fechamento do pedido ',
    description: 'As camisas estão sendo estampadas com a sua arte.',
    status: 'pending',
  },
  {
    title: 'Conferência de informações',
    description: 'Estamos inspecionando cada detalhe para garantir a perfeição.',
    status: 'pending',
  },
  {
    title: 'Produção',
    description: 'As camisas estão sendo produzidas com a sua arte.',
    status: 'pending',
  },
  {
    title: 'Seu pedido está Pronto',
    description: 'Seu pedido foi finalizado, está dispnível para retirada ou entrega.',
    status: 'pending',
  },
];

const checklistElement = document.getElementById('checklist') as HTMLOListElement;

function renderChecklist() {
  if (!checklistElement) return;
  checklistElement.innerHTML = ''; // Clear previous items

  productionSteps.forEach((item) => {
    const li = document.createElement('li');
    li.className = `timeline-item timeline-item--${item.status}`;
    li.setAttribute('aria-live', 'polite');

    li.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <h2 class="timeline-title">${item.title}</h2>
        <p>${item.description}</p>
      </div>
    `;
    checklistElement.appendChild(li);
  });
}

function simulateProgress() {
  let currentStep = 0;

  const updateStep = () => {
    if (currentStep > 0) {
      productionSteps[currentStep - 1].status = 'completed';
    }

    if (currentStep < productionSteps.length) {
      productionSteps[currentStep].status = 'in-progress';
    }

    renderChecklist();

    if (currentStep < productionSteps.length) {
      currentStep++;
      // Wait some time before starting the next step
      setTimeout(updateStep, 3000); 
    } else {
       // Mark the last step as completed
       if (productionSteps.length > 0) {
         productionSteps[productionSteps.length - 1].status = 'completed';
         renderChecklist();
       }
    }
  };

  updateStep();
}

// Initial render
renderChecklist();

// Start simulation after a brief delay
setTimeout(simulateProgress, 1000);
