# Análise de conversão: timecare.com.br/lite

Li o conteúdo e a estrutura da página, mas não vi o layout renderizado, a velocidade no celular nem os dados do Analytics. Alguns pontos abaixo são hipóteses para você confirmar nos dados.

## Principais problemas

**1. Contatos quebrados no rodapé (confiança)**
Os botões "Falar pelo WhatsApp" e "Enviar E-mail" apontam para `#`, então não levam a lugar nenhum. Para um app de um desenvolvedor desconhecido, isso passa a impressão de projeto abandonado ou inseguro. É o ponto mais fácil de corrigir.

**2. Linguagem técnica demais para o público-alvo**
Manicures, barbeiros e autônomos não se importam com termos como estes:
- "Local-First", "SQLite", "SCHEDULE_EXACT_ALARM", "smart seeds"
- "Paradigma do Utilizador Universal", "Engenharia de Alto Desempenho", "Privacidade Soberana"
- "no-show", "Quarentena Anti-Spam"

Esses termos falam de como o app foi feito, e o visitante quer saber o que ele ganha. "Utilizador" também é português de Portugal, o que destoa para um público brasileiro.

**3. Hero (topo da página) sem foco e sem imagem do app**
O título é um parágrafo que cita salões, barbearias, clínicas, estética e autônomos, e o subtítulo lista outras 8 profissões. Quando o texto tenta falar com todo mundo, ninguém se sente chamado. O vídeo demonstrativo só aparece abaixo, e há um aviso de "navegador não suporta o vídeo", sinal de que ele pode falhar ou carregar devagar no 4G.

**4. Prova social ausente, e uma promessa que não se sustenta**
"Junte-se a milhares de profissionais" aparece sem nenhuma nota da Play Store, número de downloads, depoimento ou print de avaliação. Se o app ainda não tem milhares de usuários, essa frase prejudica a confiança. Se tem, falta mostrar.

**5. Atrito no desktop**
Se parte dos visitantes vem de computador, o botão leva à Play Store web, onde a pessoa precisa fazer login e escolher um dispositivo. Muita gente desiste aí. Provavelmente vale mais mostrar um QR Code para esse público.

**6. Mensagem principal "100% offline" confusa**
Offline é um diferencial, mas não é a dor número 1 de quem tem agenda de papel. Além disso, a página mistura conceitos contraditórios: "100% offline", mas também "agendamento online", "sincroniza com Google Calendar", "backup no Drive" e "lembretes por WhatsApp". O visitante fica sem entender como o app funciona de verdade.

**7. Página muito longa e dispersa**
São 11 nichos detalhados, 4 grandes blocos de recursos, preços e FAQ. O menu ainda leva para "Clínicas →" e o rodapé para outras páginas (salão, clínica), o que dá saídas para o visitante e divide a atenção.

**8. Detalhes que passam a impressão de produto inacabado**
- Idiomas FR, DE e IT aparecem como "Breve"
- O bloco "Alcance Global Multilíngue" não interessa a quem atende no bairro
- O preço do Premium não é informado ("taxa única"), o que gera dúvida
- O texto diz "gratuito" mas também "com anúncios", sem deixar claro desde o início

**9. Sem opção para quem usa iPhone**
O app é só Android, mas isso só fica evidente em partes da página. Visitantes de iPhone saem sem ter o que fazer. Seria melhor avisar logo no topo e oferecer um aviso por e-mail ou WhatsApp.

## Melhorias sugeridas, por prioridade

### Alta prioridade (faça esta semana)
1. **Corrigir WhatsApp e e-mail do rodapé** com links reais (`https://wa.me/55XXXXXXXXXXX`, `mailto:`).
2. **Reescrever o hero** com um benefício concreto. Exemplo:
   - Título: *"Sua agenda, caixa e estoque no celular. Grátis, sem mensalidade e sem precisar de internet."*
   - Subtítulo: *"Para cabeleireiras, barbeiros, manicures e autônomos. Instale e comece a usar em 1 minuto, sem cadastro."*
3. **Colocar prints do app (ou um GIF curto) ao lado do título**, visíveis sem rolar a página, junto com o botão da Play Store.
4. **Adicionar prova social real**: nota e número de downloads da Play Store, 2 ou 3 depoimentos curtos com nome e profissão, ou um print de avaliações. Remova "milhares de profissionais" se o número não for verdadeiro.
5. **Adicionar o selo oficial "Disponível no Google Play"** em vez de só um botão de texto, porque o selo passa mais segurança.
6. **Padronizar os CTAs** em algo como "Baixar grátis no Google Play". Hoje há 12 ou mais botões com textos diferentes e longos.

### Média prioridade
7. **Detectar o dispositivo**: no desktop, mostrar QR Code e "enviar link para meu celular"; no iPhone, avisar que o app é só Android e oferecer lista de espera.
8. **Trocar o jargão por benefícios.** Por exemplo:
   - "Alarmes exatos do SO" → "Lembrete toca na hora certa, mesmo com o celular parado"
   - "Quarentena anti-spam" → "Você aprova cada pedido de agendamento antes de entrar na agenda"
   - "Local-First SQLite" → "Seus dados ficam só no seu celular"
9. **Encurtar a página**: reduzir os 11 nichos para um carrossel ou grade simples com ícone e nome, e manter só 3 ou 4 blocos de recursos.
10. **Mostrar o preço do Premium** (ex.: "R$ X,XX uma única vez") e explicar o modelo de anúncios logo no início.
11. **Remover ou esconder** "Clínicas →", a seleção de idiomas "Breve" e links para outras páginas durante a decisão de download.
12. **Barra de download fixa no celular**, com o botão sempre visível ao rolar.

### Medição (para saber o que realmente está acontecendo)
13. **Instalar o Microsoft Clarity (grátis) ou Hotjar** para ver gravações e mapas de calor: onde as pessoas param de rolar, se tocam em elementos que não são links, se o vídeo carrega.
14. **Medir no GA4** os eventos de clique no botão, a profundidade de rolagem, o dispositivo (desktop/mobile) e a origem do tráfego.
15. **Adicionar parâmetros UTM** ao link da Play Store (ex.: `&referrer=utm_source%3Dsite%26utm_campaign%3Dlite`), para ver no Play Console de onde vêm as instalações. O `pcampaignid=web_share` atual não ajuda a identificar a origem.
16. **Rodar o PageSpeed Insights** em modo mobile. Vídeo e várias imagens pesadas podem estar deixando a página lenta.

## Perguntas para investigar nos dados
- **De onde vem o tráfego?** Se vem de anúncio ou post genérico, o público pode estar errado (clínicas, curiosos, bots).
- **Quantos são desktop e quantos são mobile?** Se a maioria é desktop, o problema principal é o ponto 5.
- **Quantos clicam no botão e quantos instalam?** Se muita gente clica e poucos instalam, o problema está na ficha da Play Store (capturas de tela, descrição, avaliações, e talvez a mensagem de "app com anúncios"), não na página.
- **Qual é o tempo médio na página e a rolagem?** Saída rápida indica problema de carregamento ou de mensagem no topo.
