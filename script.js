document.addEventListener("DOMContentLoaded", () => {
    const timeSelect = document.getElementById("time");
    const services = document.querySelectorAll(".service");
    const totalElement = document.getElementById("total");
    const confirmAppointmentButton = document.getElementById("confirmAppointment");
    const pixSection = document.getElementById("pixSection");
    const pixCode = document.getElementById("pixCode");
    const copyPixButton = document.getElementById("copyPix");
    const finalizeAppointmentButton = document.getElementById("finalizeAppointment");
    const contactButton = document.getElementById("contactButton"); // Botão "Contato"

    // Preenchendo os horários disponíveis (incluindo 08:00)
    const availableTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    availableTimes.forEach(time => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });

    // Calculando o total dos serviços
    services.forEach(service => {
        service.addEventListener("change", () => {
            let total = 0;
            services.forEach(service => {
                if (service.checked) {
                    total += parseFloat(service.value);
                }
            });
            totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        });
    });

    // Mostrar seção de pagamento PIX
    confirmAppointmentButton.addEventListener("click", () => {
        pixSection.classList.remove("hidden");
        pixSection.scrollIntoView({ behavior: "smooth" });
    });

    // Copiar código PIX
    copyPixButton.addEventListener("click", () => {
        navigator.clipboard.writeText(pixCode.value)
            .then(() => alert("Código PIX copiado com sucesso!"))
            .catch(err => alert("Erro ao copiar o código PIX."));
    });

    // Finalizar agendamento
    finalizeAppointmentButton.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value.trim();
        const time = document.getElementById("time").value.trim();

        let selectedServices = [];
        let total = 0;

        services.forEach(service => {
            if (service.checked) {
                selectedServices.push(service.getAttribute("data-name"));
                total += parseFloat(service.value);
            }
        });

        if (!name || !phone || !date || !time || selectedServices.length === 0) {
            alert("Por favor, preencha todos os campos e selecione ao menos um serviço.");
            return;
        }

        const servicesText = selectedServices.join(", ");
        const totalText = `R$ ${total.toFixed(2).replace(".", ",")}`;
        const message = `Olá, Renovo Barber! Gostaria de confirmar meu agendamento com as seguintes informações:%0A%0A*Nome:* ${name}%0A*Telefone:* ${phone}%0A*Data:* ${date}%0A*Horário:* ${time}%0A*Serviços:* ${servicesText}%0A*Total:* ${totalText}%0APagamento via PIX confirmado.`;

        const whatsappNumber = "5531990723954"; // Número oficial do WhatsApp (inclui código do Brasil)
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Abre o WhatsApp no navegador
        window.open(whatsappLink, "_blank");

        alert("Agendamento enviado pelo WhatsApp! Obrigado por escolher a Renovo Barber.");
        location.reload(); // Recarrega a página para limpar o formulário
    });

    // Redirecionar para WhatsApp ao clicar em "Contato"
    contactButton.addEventListener("click", () => {
        const whatsappNumber = "5531990723954"; // Número oficial do WhatsApp
        const contactMessage = "Olá, gostaria de mais informações sobre os serviços da Renovo Barber.";
        const contactLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactMessage)}`;

        // Redireciona para o link do WhatsApp
        window.open(contactLink, "_blank");
    });
});
