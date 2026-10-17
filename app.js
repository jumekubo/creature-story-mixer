const form = document.querySelector("#story-form");
const storySection = document.querySelector("#story-section");
const storyOutput = document.querySelector("#story-output");
const storyTitle = document.querySelector("#story-title");
const formError = document.querySelector("#form-error");

const fieldIds = [
  "creatureName", "habitat", "personality", "sensor", "senses", "output", "response", "ability",
  "adjective", "object", "food", "animal", "place", "verbIng", "sillyObject", "exclamation", "number"
];

const surpriseWords = {
  adjective: ["sparkly", "wobbly", "dramatic", "suspicious", "fuzzy", "enormous", "invisible", "crunchy"],
  object: ["toaster", "traffic cone", "suitcase", "trombone", "alarm clock", "garden hose", "skateboard", "teacup"],
  food: ["mashed potatoes", "blueberry pancakes", "spaghetti", "pickles", "popcorn", "frozen waffles", "nachos", "jellybeans"],
  animal: ["penguin", "llama", "squirrel", "octopus", "goose", "hamster", "wombat", "chicken"],
  place: ["the Moon", "a haunted laundromat", "the royal snack pantry", "an underwater library", "the top of a volcano", "a miniature golf course", "the school cafeteria", "a cloud castle"],
  verbIng: ["tap-dancing", "juggling", "sneezing", "moonwalking", "whistling", "cartwheeling", "hiccupping", "speed-knitting"],
  sillyObject: ["rubber chicken", "left sock", "tiny umbrella", "golden spatula", "button jar", "plastic crown", "singing spoon", "emergency kazoo"],
  exclamation: ["Great bouncing broccoli!", "By the beard of a jellyfish!", "Holy guacamole!", "Well, butter my backpack!", "Jumping jellybeans!", "Crumbs and cabbages!"],
  number: [7, 12, 17, 23, 42, 88]
};

let lastTemplateIndex = -1;

const esc = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[char]));

const word = (value) => `<span class="story-word">${esc(value)}</span>`;
const cap = (value) => String(value).charAt(0).toUpperCase() + String(value).slice(1);
const pick = (items) => items[Math.floor(Math.random() * items.length)];

function creatureDetails() {
  return Object.fromEntries(fieldIds.map((id) => [id, document.querySelector(`#${id}`).value.trim()]));
}

function hardwareMoment(d, intro) {
  return `<span class="hardware-moment" role="group" aria-label="Sense, think, act sequence">
    <span class="hardware-intro">${esc(intro)}</span>
    <span class="hardware-step"><b>SENSE</b><span>${word(d.creatureName)}'s ${word(d.sensor)} detected ${word(d.senses)}.</span></span>
    <span class="hardware-step"><b>THINK</b><span>The program checked the input and chose the programmed response.</span></span>
    <span class="hardware-step"><b>ACT</b><span>${word(d.output)} <i aria-hidden="true">→</i> ${word(d.response)}</span></span>
  </span>`;
}

const templates = [
  (d) => ({
    title: `The Mysterious Delivery for ${d.creatureName}`,
    paragraphs: [
      `One unusually ${word(d.adjective)} morning, ${word(d.creatureName)} was relaxing in ${word(d.habitat)}. Being a naturally ${word(d.personality)} creature, ${word(d.creatureName)} had arranged a collection of ${word(d.sillyObject)}s in perfect alphabetical order. That was when something outside went <strong>THUMP. THUMP. SQUEAK.</strong>`,
      `At the entrance sat a package shaped like ${word(d.object)}. A label on the front read: <strong>FOR ${esc(d.creatureName.toUpperCase())}. EXTREMELY IMPORTANT. PROBABLY NOT DANGEROUS.</strong> “That is exactly what a dangerous package would say,” ${word(d.creatureName)} muttered.`,
      hardwareMoment(d, "Before touching the package,"),
      `The lid burst open. Out climbed a tiny ${word(d.animal)} wearing a hat made from ${word(d.food)}. “Please help!” it cried. “The Royal ${word(d.sillyObject)} has been stolen and taken to ${word(d.place)}. If it is not returned before lunch, everyone will be forced to eat plain oatmeal forever!”`,
      `${word(d.creatureName)} gasped. Plain oatmeal was serious. It packed ${word(d.number)} snacks and followed the visitor down a path that had not been there five minutes earlier. Halfway there, they found a river full of warm ${word(d.food)}. The only bridge was ${word(d.verbIng)} so wildly that nobody could step onto it.`,
      `Luckily, ${word(d.creatureName)} had a special ability: ${word(d.ability)}. Using this remarkable talent, it discovered a hidden tunnel beneath the river. The tunnel ended inside a gigantic cupboard in ${word(d.place)}, where the thief was guarding the missing treasure.`,
      `“You will never get it back!” shouted the thief. “Unless you defeat me in a contest of ${word(d.verbIng)}!” Music began playing from absolutely nowhere. ${word(d.creatureName)} performed bravely. The tiny ${word(d.animal)} attempted a dramatic spin, crashed into ${word(d.object)}, and accidentally launched ${word(d.food)} across the room.`,
      `“${word(d.exclamation)}” cried everyone at once. The thief laughed so hard that the Royal ${word(d.sillyObject)} rolled free. ${word(d.creatureName)} returned it safely and became a hero. From that day on, whenever a mysterious package appeared, ${word(d.creatureName)} packed a snack first. Adventures were exciting, but adventures with snacks were clearly better.`
    ]
  }),
  (d) => ({
    title: `${d.creatureName} and the Great Habitat Mix-Up`,
    paragraphs: [
      `On an unusually ${word(d.adjective)} afternoon, ${word(d.creatureName)} woke up and immediately knew something was wrong. ${word(d.habitat)} had vanished. In its place stood ${word(d.place)}, complete with a gift shop selling ${word(d.sillyObject)}s.`,
      `A nervous ${word(d.animal)} hurried over. “Welcome!” it said. “I am afraid we switched your habitat with ours by pressing the enormous red button marked <strong>DO NOT PRESS ${esc(d.number)} TIMES</strong>.” Behind it, ${word(d.number)} workers were ${word(d.verbIng)} around a machine made from ${word(d.object)}s.`,
      `Because ${word(d.creatureName)} was famously ${word(d.personality)}, it agreed to investigate. It crept toward the machine while the workers argued about whether ${word(d.food)} counted as a tool.`,
      hardwareMoment(d, "As the machine began to rumble,"),
      `The response startled the ${word(d.animal)}, which bumped the red button one more time. With a flash, everyone landed in a hallway containing ${word(d.number)} identical doors. One door smelled like ${word(d.food)}. One was singing. One whispered, “Definitely do not open me.”`,
      `${word(d.creatureName)} used its special ability—${word(d.ability)}—and chose the singing door. On the other side was the missing habitat, balanced on top of a gigantic ${word(d.object)}. Unfortunately, the machine's remote control was being worn as a necklace by a very serious-looking ${word(d.animal)}.`,
      `“I will return this remote,” declared the guard, “if you can make me laugh.” ${word(d.creatureName)} thought for a moment, placed a ${word(d.sillyObject)} on its head, and began ${word(d.verbIng)} while reciting the lunch menu backward.`,
      `“${word(d.exclamation)}” snorted the guard, laughing so hard that the remote fell off. ${word(d.creatureName)} pressed the correct button, restored ${word(d.habitat)}, and sent everyone home. The giant red button was replaced with a sign reading: <strong>ASK A ${esc(d.creatureName.toUpperCase())} BEFORE TOUCHING ANYTHING.</strong>`
    ]
  }),
  (d) => ({
    title: `${d.creatureName} Enters the Impossible Games`,
    paragraphs: [
      `Every ${word(d.adjective)} year, the Impossible Games arrived at ${word(d.habitat)}. Competitors came from ${word(d.place)} and beyond to prove who could run, leap, and balance ${word(d.food)} on their heads. ${word(d.creatureName)} had never entered before, but a ${word(d.personality)} feeling said today should be different.`,
      `At registration, a referee who happened to be a ${word(d.animal)} handed ${word(d.creatureName)} the number ${word(d.number)} and a ceremonial ${word(d.sillyObject)}. “There are three events,” announced the referee. “The Wobbly Maze, the Mystery Button, and synchronized ${word(d.verbIng)}.”`,
      `The Wobbly Maze was built entirely from ${word(d.object)}s. Walls leaned sideways. The floor bounced. Somewhere inside, a machine flung spoonfuls of ${word(d.food)} at the competitors. ${word(d.creatureName)} moved carefully until a hidden door began to close.`,
      hardwareMoment(d, "At exactly the right moment,"),
      `${word(d.creatureName)} slipped through with half a second to spare. The audience cheered, although one spectator yelled, “${word(d.exclamation)}” and dropped ${word(d.number)} bags of popcorn.`,
      `Next came the Mystery Button. The rules were simple: press the button and survive whatever happened next. ${word(d.creatureName)} pressed it. The stadium disappeared. Suddenly, the entire competition was floating over ${word(d.place)}, and the referee had turned into a talking ${word(d.object)}.`,
      `There was only one way home. ${word(d.creatureName)} used its special ability, ${word(d.ability)}, to guide every competitor toward a glowing doorway. They reached it just as the synchronized ${word(d.verbIng)} finals began. Nobody knew the routine, so ${word(d.creatureName)} invented one involving a ${word(d.sillyObject)}, three hops, and a heroic amount of confidence.`,
      `The judges awarded ${word(d.creatureName)} first prize—not for being fastest, but for rescuing everyone and making the final event completely unforgettable. The medal was made of ${word(d.food)}. It did not last long, but the story did.`
    ]
  }),
  (d) => ({
    title: `${d.creatureName} and the Midnight Snack Emergency`,
    paragraphs: [
      `At precisely midnight in ${word(d.habitat)}, ${word(d.creatureName)} heard the unmistakable sound of someone ${word(d.verbIng)} near the snack cabinet. This was alarming because the cabinet was protected by ${word(d.number)} locks, a password, and one extremely judgmental ${word(d.animal)}.`,
      `A trail of ${word(d.food)} led away from the cabinet and toward a tunnel beneath ${word(d.object)}. Most creatures would have called for help. But ${word(d.creatureName)} was too ${word(d.personality)} to ignore a midnight mystery.`,
      hardwareMoment(d, "Just inside the tunnel,"),
      `“${word(d.exclamation)}” shouted ${word(d.creatureName)}. The tunnel walls unfolded like an accordion, revealing a secret elevator. Its buttons were labeled <strong>UP</strong>, <strong>DOWN</strong>, and <strong>SOMEWHERE ${esc(d.adjective.toUpperCase())}</strong>. Naturally, the third button lit up by itself.`,
      `The elevator arrived at ${word(d.place)}. There, an exhausted ${word(d.animal)} was attempting to repair a huge machine with a ${word(d.sillyObject)}. “Our snack-making machine is broken,” it explained. “It keeps producing ${word(d.object)}s instead of food. We borrowed your snacks because our workers are starving.”`,
      `${word(d.creatureName)} examined the machine. Inside were ${word(d.number)} tangled wires and a note that said, <strong>WHEN CONFUSED, TRY ${esc(d.verbIng.toUpperCase())}.</strong> That seemed like terrible engineering advice. Fortunately, ${word(d.creatureName)} could ${word(d.ability)}.`,
      `Using its ability and excellent creature instincts, ${word(d.creatureName)} found the backward wire. The machine shuddered, sneezed, and produced a mountain of ${word(d.food)}—followed by one final ${word(d.sillyObject)} for no clear reason.`,
      `The workers celebrated until sunrise. They returned the borrowed snacks and gave ${word(d.creatureName)} a lifetime supply of emergency ${word(d.food)}. Back at ${word(d.habitat)}, the judgmental guard inspected the cabinet, nodded once, and said, “Acceptable.” It was the nicest thing the guard had ever said.`
    ]
  })
];

function makeLibraryStory(blueprint) {
  return (d) => ({
    title: blueprint.title(d),
    paragraphs: [
      blueprint.opening(d),
      blueprint.problem(d),
      `${word(d.creatureName)} packed ${word(d.number)} pieces of ${word(d.food)}, one emergency ${word(d.sillyObject)}, and exactly zero sensible maps. The route to ${word(d.place)} began peacefully, but soon ${blueprint.journey(d)}`,
      hardwareMoment(d, blueprint.hardwareIntro),
      blueprint.response(d),
      `${word(d.creatureName)} still had one advantage: the ability to ${word(d.ability)}. It used that talent to ${blueprint.ability(d)} The plan was unusual, slightly ${word(d.adjective)}, and much better than doing nothing.`,
      blueprint.showdown(d),
      blueprint.ending(d)
    ]
  });
}

const libraryBlueprints = [
  {
    title: (d) => `${d.creatureName} and the Cloud Factory Crisis`,
    opening: (d) => `A square cloud landed beside ${word(d.habitat)} while ${word(d.creatureName)} was quietly ${word(d.verbIng)}. The cloud had a door, a chimney, and a sign reading <strong>WEATHER DELIVERY - PLEASE KNOCK</strong>. Naturally, ${word(d.creatureName)} knocked.`,
    problem: (d) => `A rain-soaked ${word(d.animal)} opened the door and explained that the Cloud Factory had mixed up every weather jar. Snow was falling inside ovens, sunshine was stuck under a desk, and a storm made of ${word(d.food)} was drifting toward ${word(d.place)}. Only a truly ${word(d.personality)} creature could help.`,
    journey: (d) => `the fog staircase turned into ${word(d.object)}s, and every step shouted an incorrect weather forecast.`,
    hardwareIntro: "At the factory's humming front gate,",
    response: (d) => `The gate recognized the response and opened just before a gust of wind launched ${word(d.number)} umbrellas into the ceiling. Inside, enormous machines were squeezing rain from clouds while workers chased a tornado carrying a ${word(d.sillyObject)}.`,
    ability: (d) => `reach the master control room and separate the sunshine lever from the suspicious lever labeled <strong>MORE ${esc(d.food.toUpperCase())}</strong>.`,
    showdown: (d) => `The factory manager challenged ${word(d.creatureName)} to sort the final three storms while ${word(d.verbIng)}. “${word(d.exclamation)}” shouted the workers as ${word(d.creatureName)} sent rain to the gardens, snow to the mountains, and the ${word(d.food)} storm directly into the cafeteria.`,
    ending: (d) => `The sky cleared over ${word(d.habitat)}. As thanks, the factory gave ${word(d.creatureName)} a pocket-sized cloud that rained only when someone needed a drink. Unfortunately, it also thundered whenever anyone mentioned ${word(d.object)}s.`
  },
  {
    title: (d) => `${d.creatureName} and the Library That Wouldn't Stay Quiet`,
    opening: (d) => `The oldest book in ${word(d.habitat)} sneezed directly at ${word(d.creatureName)}. Then every book on the shelf began ${word(d.verbIng)}. A dictionary shouted random words, an atlas tried to fold itself into a hat, and a cookbook demanded ${word(d.food)}.`,
    problem: (d) => `The librarian, a whispering ${word(d.animal)}, revealed that the Library's Golden Bookmark had disappeared. Without it, the stories were escaping their pages and rearranging the real world. The bookmark's trail led all the way to ${word(d.place)}.`,
    journey: (d) => `a chapter about ${word(d.object)}s spilled across the road and turned every sentence into a slippery stepping-stone.`,
    hardwareIntro: "When a wall of flying books blocked the path,",
    response: (d) => `The books paused to observe the creature's programmed response. That pause was enough for ${word(d.creatureName)} to slip through and discover the Golden Bookmark being used as a diving board by ${word(d.number)} tiny storybook pirates.`,
    ability: (d) => `follow the invisible trail of words left behind by the pirates and reach their paper ship before it sailed into the final chapter.`,
    showdown: (d) => `The pirate captain offered a deal: win a dramatic reading contest or remain trapped in the footnotes forever. ${word(d.creatureName)} read a scene about a ${word(d.adjective)} ${word(d.sillyObject)} with such feeling that the captain burst into tears and returned the bookmark.`,
    ending: (d) => `Back in the library, every story returned to its proper shelf. The librarian awarded ${word(d.creatureName)} a library card that could summon one helpful book per week. The first book summoned was, rather unfortunately, <em>${esc(cap(d.object))} Care for Beginners</em>.`
  },
  {
    title: (d) => `${d.creatureName} and the Runaway Parade`,
    opening: (d) => `${word(d.creatureName)} was preparing for a calm day in ${word(d.habitat)} when a marching band thundered past without any musicians. Drums bounced by themselves, trumpets shouted “LEFT! RIGHT! SNACK!” and a float shaped like a ${word(d.object)} rolled toward the horizon.`,
    problem: (d) => `A breathless ${word(d.animal)} explained that the Grand Parade had become self-driving and refused to stop. It was headed toward ${word(d.place)}, carrying ${word(d.number)} performers and the town's entire supply of ${word(d.food)}.`,
    journey: (d) => `${word(d.creatureName)} had to leap onto the final float while it swerved around puddles and continued ${word(d.verbIng)} to its own music.`,
    hardwareIntro: "As the runaway float approached a closed bridge,",
    response: (d) => `The creature's response caught the attention of the lead drum, which copied it exactly. Soon every instrument was responding in rhythm, slowing the parade just enough for ${word(d.creatureName)} to climb toward the control platform.`,
    ability: (d) => `swing between the floats, avoid a cloud of confetti, and locate the steering wheel hidden beneath a pile of ${word(d.sillyObject)}s.`,
    showdown: (d) => `The steering wheel refused to cooperate unless someone defeated it in a ${word(d.verbIng)} contest. ${word(d.creatureName)} accepted. “${word(d.exclamation)}” cried the crowd as the wheel finally became dizzy, surrendered, and allowed the parade to turn around.`,
    ending: (d) => `The parade reached the town square safely. ${word(d.creatureName)} was named Honorary Parade Captain and received a hat made from ${word(d.food)}. It was a magnificent hat for almost four minutes.`
  },
  {
    title: (d) => `${d.creatureName} Visits the Upside-Down Restaurant`,
    opening: (d) => `A menu floated into ${word(d.habitat)} and landed on ${word(d.creatureName)}'s head. It advertised a new restaurant at ${word(d.place)} where dessert came first, chairs sat on ceilings, and the waiters traveled by ${word(d.verbIng)}.`,
    problem: (d) => `When ${word(d.creatureName)} arrived, a worried ${word(d.animal)} announced that gravity had reversed in the kitchen. ${word(d.food)} covered the ceiling, forks were escaping through vents, and the head chef was trapped inside a giant ${word(d.object)}.`,
    journey: (d) => `the dining room tilted sideways and ${word(d.number)} bowls began orbiting the chandelier like tiny moons.`,
    hardwareIntro: "Near the upside-down kitchen door,",
    response: (d) => `The programmed response signaled a safe moment to cross. ${word(d.creatureName)} climbed a curtain, stepped onto the ceiling, and found the gravity switch guarded by a very serious soup spoon.`,
    ability: (d) => `move across the ceiling, rescue the chef, and inspect the switch without being struck by flying ${word(d.food)}.`,
    showdown: (d) => `The soup spoon demanded the restaurant's secret password. ${word(d.creatureName)} tried “please,” “${esc(d.object)},” and “${esc(d.exclamation)}” before noticing that the password was printed on a nearby ${word(d.sillyObject)}. The spoon sighed and stepped aside.`,
    ending: (d) => `Gravity returned, the food landed neatly on the correct plates, and the restaurant served ${word(d.creatureName)} a free ${word(d.food)} tower. The bill was also free, mostly because it had floated out the window.`
  },
  {
    title: (d) => `${d.creatureName} and the Time-Traveling Lunchbox`,
    opening: (d) => `While exploring ${word(d.habitat)}, ${word(d.creatureName)} discovered a ${word(d.adjective)} lunchbox ticking beneath a ${word(d.object)}. The moment it opened, a sandwich shouted, “Next stop: ${word(d.place)}!” and the whole world spun backward.`,
    problem: (d) => `${word(d.creatureName)} landed in a time when ${word(d.animal)}s ruled the land and everyone communicated by ${word(d.verbIng)}. The lunchbox's return button was missing, and history would be permanently strange unless it was recovered before the clock struck ${word(d.number)}.`,
    journey: (d) => `the trail crossed a castle built from ${word(d.food)} and a marketplace where customers traded ${word(d.sillyObject)}s instead of money.`,
    hardwareIntro: "When the lunchbox began ticking faster,",
    response: (d) => `The response revealed a glowing trail leading to the royal clock tower. At the top, the missing button hung from the crown of the Time King, who was also a rather confused ${word(d.animal)}.`,
    ability: (d) => `climb the clock's moving hands and reach the crown without being swept into next Tuesday.`,
    showdown: (d) => `The Time King agreed to return the button only if ${word(d.creatureName)} could invent a new holiday. ${word(d.creatureName)} declared International ${word(d.food)} and ${word(d.verbIng)} Day. “${word(d.exclamation)}” cheered the entire kingdom.`,
    ending: (d) => `The lunchbox carried ${word(d.creatureName)} home one minute after it had left. Inside was a note from the past thanking the creature, plus a perfectly fresh ${word(d.food)} sandwich that was somehow ${word(d.number)} years old.`
  },
  {
    title: (d) => `${d.creatureName} at the Museum After Midnight`,
    opening: (d) => `${word(d.creatureName)} accepted a nighttime job guarding the museum near ${word(d.habitat)}. The instructions were simple: lock the doors, avoid touching the exhibits, and definitely ignore any ${word(d.object)} that started ${word(d.verbIng)}.`,
    problem: (d) => `At midnight, every exhibit woke up. A portrait asked for ${word(d.food)}, a dinosaur borrowed a ${word(d.sillyObject)}, and a marble ${word(d.animal)} escaped toward ${word(d.place)} with the museum's master key.`,
    journey: (d) => `the chase wound through ${word(d.number)} galleries while suits of armor practiced a noisy dance routine.`,
    hardwareIntro: "Inside the dark Hall of Very Old Things,",
    response: (d) => `The response illuminated the escaped statue's trail. It led behind a painting and into a hidden gallery labeled <strong>EXHIBITS TOO RIDICULOUS FOR DAYTIME</strong>.`,
    ability: (d) => `navigate the secret gallery and avoid waking a display of snoring ${word(d.object)}s.`,
    showdown: (d) => `The marble ${word(d.animal)} had taken the key because it wanted its own exhibit. ${word(d.creatureName)} created one on the spot: <em>The ${esc(cap(d.adjective))} Key Keeper of ${esc(d.place)}</em>. Delighted, the statue returned the key and posed proudly.`,
    ending: (d) => `At sunrise, every exhibit froze in place. The museum director found everything normal except for one new statue wearing a ${word(d.sillyObject)}. ${word(d.creatureName)} received a perfect job review and decided not to mention the dinosaur.`
  },
  {
    title: (d) => `${d.creatureName} and the Great Moon Cheese Rescue`,
    opening: (d) => `A tiny rocket crashed gently into ${word(d.habitat)} and unfolded into a picnic table. Its pilot, a ${word(d.animal)} in silver boots, announced that the Moon's emergency cheese had disappeared.`,
    problem: (d) => `Without the cheese, the Moon was becoming lighter and drifting toward ${word(d.place)}. Scientists had found one clue: a ${word(d.adjective)} bite mark shaped exactly like ${word(d.object)}.`,
    journey: (d) => `${word(d.creatureName)} rode the rocket past ${word(d.number)} satellites, a comet made of ${word(d.food)}, and an astronaut calmly ${word(d.verbIng)} in open space.`,
    hardwareIntro: "At the entrance to the Moon's cheese vault,",
    response: (d) => `The response unlocked the vault. Inside, a trail of crumbs led into a crater where a giant space mouse was building a palace from cheese and ${word(d.sillyObject)}s.`,
    ability: (d) => `cross the crater silently and reach the palace before the Moon drifted any farther.`,
    showdown: (d) => `The mouse refused to return the cheese unless someone produced a better building material. ${word(d.creatureName)} demonstrated that ${word(d.object)}s were stronger, lighter, and much less snackable. “${word(d.exclamation)}” said the mouse, completely convinced.`,
    ending: (d) => `The cheese returned to the vault, and the Moon floated back into place. ${word(d.creatureName)} received a medal shaped like ${word(d.food)} and permission to visit whenever the rocket picnic table was available.`
  },
  {
    title: (d) => `${d.creatureName} and the Underwater Talent Show`,
    opening: (d) => `A bubble invitation drifted through ${word(d.habitat)}: <strong>YOU ARE INVITED TO THE DEEPEST TALENT SHOW ON EARTH.</strong> It promised prizes, snacks, and transportation to an underwater theater beneath ${word(d.place)}.`,
    problem: (d) => `The host, an elegant ${word(d.animal)}, explained that the star performer had disappeared. The audience of ${word(d.number)} sea creatures was growing restless and had begun throwing ${word(d.food)} at the curtains.`,
    journey: (d) => `${word(d.creatureName)} searched backstage among singing shells, nervous jellyfish, and a troupe of ${word(d.object)}s rehearsing synchronized ${word(d.verbIng)}.`,
    hardwareIntro: "When bubbles poured from a locked dressing room,",
    response: (d) => `The response showed that someone was inside. ${word(d.creatureName)} opened the door and found the missing performer trapped beneath a mountain of runaway costumes and one enormous ${word(d.sillyObject)}.`,
    ability: (d) => `clear the costumes and repair the performer's bubble helmet before the final curtain rose.`,
    showdown: (d) => `The helmet repair worked, but the performer had forgotten the entire act. ${word(d.creatureName)} joined the stage and improvised a routine involving ${word(d.verbIng)}, ${word(d.food)}, and a very confused ${word(d.animal)}. The audience shouted, “${word(d.exclamation)}”`,
    ending: (d) => `The judges awarded both performers first prize: a golden ${word(d.sillyObject)} and unlimited seaweed snacks. ${word(d.creatureName)} returned home inside a bubble that played applause whenever it bumped into furniture.`
  },
  {
    title: (d) => `${d.creatureName} and the Invisible Carnival`,
    opening: (d) => `${word(d.creatureName)} heard carnival music near ${word(d.habitat)}, but the field was completely empty. Then an invisible ticket landed in its hand and a voice whispered, “Welcome to the carnival that cannot be seen.”`,
    problem: (d) => `The ringmaster, an invisible ${word(d.animal)}, admitted that the carnival had lost its visibility switch. Guests kept sitting on invisible ${word(d.object)}s, and the roller coaster was headed toward ${word(d.place)} without a visible track.`,
    journey: (d) => `the only clues were floating ${word(d.food)}, ${word(d.number)} sets of footprints, and the sound of someone ${word(d.verbIng)} behind the invisible prize booth.`,
    hardwareIntro: "Beside the unseen roller-coaster controls,",
    response: (d) => `The response startled a hidden thief, who dropped the visibility switch and escaped on an invisible unicycle. ${word(d.creatureName)} grabbed the switch, but its label had worn away.`,
    ability: (d) => `identify the correct setting before the invisible coaster reached the edge of the fairgrounds.`,
    showdown: (d) => `${word(d.creatureName)} tried three settings. The first revealed only hats. The second revealed every ${word(d.sillyObject)} in the carnival. The third restored everything just as the coaster stopped. “${word(d.exclamation)}” yelled the passengers.`,
    ending: (d) => `The ringmaster awarded ${word(d.creatureName)} free carnival admission forever and a visible bag of invisible prizes. The prizes were difficult to admire, but they made excellent conversation starters.`
  },
  {
    title: (d) => `${d.creatureName}'s Royal Dragon-Sitting Job`,
    opening: (d) => `A royal messenger arrived at ${word(d.habitat)} carrying a crown, a clipboard, and ${word(d.number)} fire extinguishers. The palace needed someone ${word(d.personality)} to watch a baby dragon for one afternoon.`,
    problem: (d) => `The baby dragon looked harmless until it sneezed and turned a ${word(d.object)} into ${word(d.food)}. Then it escaped through a window, grabbed the Royal ${word(d.sillyObject)}, and flew toward ${word(d.place)}.`,
    journey: (d) => `${word(d.creatureName)} followed across rooftops while palace guards chased the wrong ${word(d.animal)} and the dragon practiced ${word(d.verbIng)} in midair.`,
    hardwareIntro: "When the dragon hid inside a smoky tower,",
    response: (d) => `The response helped ${word(d.creatureName)} locate the dragon without stepping into a pile of enchanted soot. The baby was not being naughty; it was trying to hatch a mysterious golden egg.`,
    ability: (d) => `reach the egg, calm the dragon, and determine why the shell was making accordion noises.`,
    showdown: (d) => `The egg cracked open and released a tiny ${word(d.animal)} wearing the royal crown. It immediately began ${word(d.verbIng)}. “${word(d.exclamation)}” cried the guards, who had finally arrived with a net made from ${word(d.food)}.`,
    ending: (d) => `${word(d.creatureName)} returned both creatures to the palace and received the kingdom's highest babysitting honor. The medal was a little burned around the edges, but it smelled pleasantly like ${word(d.food)}.`
  },
  {
    title: (d) => `${d.creatureName} and the Weather Machine Wobble`,
    opening: (d) => `The weather over ${word(d.habitat)} changed ${word(d.number)} times before breakfast. Sunshine became snow, snow became ${word(d.food)}, and a tiny thunderstorm followed ${word(d.creatureName)} from room to room.`,
    problem: (d) => `A mechanic ${word(d.animal)} arrived in a flying ${word(d.object)} and confessed that the town's weather machine had developed a wobble. If it tipped over, all future Tuesdays would be permanently ${word(d.adjective)}.`,
    journey: (d) => `the path to the machine crossed a field of sideways rain and a wind tunnel full of ${word(d.sillyObject)}s.`,
    hardwareIntro: "As lightning flickered around the control panel,",
    response: (d) => `The response revealed which control wire was active. Unfortunately, the wire was wrapped around a lever marked <strong>DO NOT PULL WHILE ${esc(d.verbIng.toUpperCase())}</strong>.`,
    ability: (d) => `steady the wobbling machine while the mechanic untangled the wire and counted backward from ${word(d.number)}.`,
    showdown: (d) => `A final gust lifted the mechanic into the air. ${word(d.creatureName)} grabbed the lever, shouted “${word(d.exclamation)}” and selected normal weather just before the machine sneezed out one last cloud of ${word(d.food)}.`,
    ending: (d) => `The forecast returned to normal, except for a ten-minute ${word(d.food)} shower every Friday. The town voted to keep that feature and named ${word(d.creatureName)} Official Weather Wobble Inspector.`
  },
  {
    title: (d) => `${d.creatureName} and the Case of the Missing Colors`,
    opening: (d) => `${word(d.creatureName)} woke to discover that ${word(d.habitat)} had turned completely gray. Even ${word(d.food)} looked gray, which made breakfast deeply untrustworthy. A single trail of bright footprints led toward ${word(d.place)}.`,
    problem: (d) => `A color detective ${word(d.animal)} explained that someone had stolen red, blue, yellow, and a mysterious color called “${esc(d.adjective)}-ish.” The thief had escaped in a getaway ${word(d.object)} carrying ${word(d.number)} paintbrushes.`,
    journey: (d) => `the trail crossed a colorless forest where the trees complained loudly and the birds had forgotten which ones were supposed to be ${word(d.verbIng)}.`,
    hardwareIntro: "At a cave filled with invisible paint,",
    response: (d) => `The response revealed splashes that could not be seen with ordinary eyes. They led to a workshop where a lonely artist was using every stolen color to decorate one enormous ${word(d.sillyObject)}.`,
    ability: (d) => `enter the workshop unnoticed and show the artist how to create new colors without stealing the old ones.`,
    showdown: (d) => `${word(d.creatureName)} mixed two colors, added a drop of ${word(d.food)}, and invented a shade so surprising that everyone yelled, “${word(d.exclamation)}” The artist immediately agreed to return the missing colors.`,
    ending: (d) => `Color rushed back into the world. As an apology, the artist painted a portrait of ${word(d.creatureName)} looking extremely heroic beside a ${word(d.animal)}. The portrait was hung in ${word(d.habitat)} at a slightly crooked angle.`
  },
  {
    title: (d) => `${d.creatureName} Takes the Train to Nowhere in Particular`,
    opening: (d) => `A train station appeared overnight beside ${word(d.habitat)}. Its sign read <strong>NOWHERE IN PARTICULAR - DEPARTING SOONISH</strong>. ${word(d.creatureName)} bought a ticket from a ${word(d.animal)} using ${word(d.number)} crumbs of ${word(d.food)}.`,
    problem: (d) => `Once aboard, the conductor admitted that the train had forgotten its destination. It was circling ${word(d.place)}, adding a new car every hour, and the dining car served nothing but ${word(d.adjective)} ${word(d.object)} soup.`,
    journey: (d) => `${word(d.creatureName)} searched through a sleeping car full of ${word(d.sillyObject)}s, a car where everyone was ${word(d.verbIng)}, and a baggage car that insisted it was a submarine.`,
    hardwareIntro: "When a locked engine-room door began to shake,",
    response: (d) => `The response opened the door and exposed a navigation compass spinning in every direction. A note beside it read: <strong>ASK THE TRAIN WHERE IT WANTS TO GO.</strong>`,
    ability: (d) => `climb onto the engine, communicate with the confused train, and discover that it had always dreamed of visiting ${word(d.place)}.`,
    showdown: (d) => `The tracks did not go there, so ${word(d.creatureName)} built a temporary route using ${word(d.object)}s while the passengers shouted “${word(d.exclamation)}” and continued ${word(d.verbIng)} for encouragement.`,
    ending: (d) => `The train finally arrived exactly where it wanted. It thanked ${word(d.creatureName)} with a lifetime ticket to Somewhere Quite Specific and a dining-car voucher for anything except soup.`
  },
  {
    title: (d) => `${d.creatureName} and the Giant Garden Mystery`,
    opening: (d) => `During the night, everything in the garden near ${word(d.habitat)} grew enormous. A carrot blocked the road, one pea required ${word(d.number)} wheelbarrows, and a ${word(d.animal)} was trapped on top of a towering ${word(d.food)} plant.`,
    problem: (d) => `The gardener discovered an empty bottle labeled <strong>GROWTH JUICE - ONE DROP ONLY</strong>. The bottle had tooth marks, and a trail of oversized footprints led toward ${word(d.place)} carrying a giant ${word(d.object)}.`,
    journey: (d) => `${word(d.creatureName)} climbed vines like ladders and crossed a leaf where raindrops rolled past like bowling balls while beetles practiced ${word(d.verbIng)}.`,
    hardwareIntro: "Beneath a pumpkin large enough to be a house,",
    response: (d) => `The response revealed movement inside. ${word(d.creatureName)} opened a window cut into the pumpkin and found a small ${word(d.animal)} experimenting with the last drop of growth juice.`,
    ability: (d) => `reach the bottle before the experiment turned a ${word(d.sillyObject)} into the largest object in the world.`,
    showdown: (d) => `The bottle tipped. ${word(d.creatureName)} caught it while ${word(d.verbIng)}, but one drop landed on ${word(d.food)}. “${word(d.exclamation)}” everyone cried as it grew just large enough to feed the entire town.`,
    ending: (d) => `The gardener brewed shrinking tea, and the garden slowly returned to normal. ${word(d.creatureName)} received a basket of vegetables and one warning: never leave science supplies near a hungry ${word(d.animal)}.`
  },
  {
    title: (d) => `${d.creatureName} and the Robot Royalty Mix-Up`,
    opening: (d) => `A robot carriage arrived at ${word(d.habitat)} and bowed to ${word(d.creatureName)}. “Your Majesty,” it beeped, placing a crown made of ${word(d.object)}s on the creature's head. “The kingdom of ${word(d.place)} requires you immediately.”`,
    problem: (d) => `The robot palace had confused ${word(d.creatureName)} with its missing ruler. Until the ruler returned, ${word(d.creatureName)} had to judge ${word(d.number)} arguments, approve a national ${word(d.food)} recipe, and stop the royal ${word(d.animal)} from pressing every button.`,
    journey: (d) => `the search for the real ruler passed through a ballroom of robots ${word(d.verbIng)} and a hallway guarded by talking ${word(d.sillyObject)}s.`,
    hardwareIntro: "At the sealed royal workshop,",
    response: (d) => `The response matched the workshop's emergency code. Inside, the missing ruler was trapped in a machine that kept producing crowns but refused to open its door.`,
    ability: (d) => `reach the machine's reset switch and explain to the palace robots that being ${word(d.personality)} mattered more than wearing a crown.`,
    showdown: (d) => `The machine demanded one final royal command. ${word(d.creatureName)} declared, “${word(d.exclamation)} Stop making crowns and release the ruler!” The machine considered this, printed one ${word(d.adjective)} crown, and finally opened.`,
    ending: (d) => `The ruler returned to the throne and named ${word(d.creatureName)} Royal Problem Solver. The robot carriage delivered the creature home, along with ${word(d.number)} extra crowns that nobody had ordered.`
  },
  {
    title: (d) => `The Day Gravity Took a Break`,
    opening: (d) => `${word(d.creatureName)} noticed that gravity had stopped working when its breakfast ${word(d.food)} floated out the window. Soon ${word(d.object)}s, trees, and one surprised ${word(d.animal)} were drifting above ${word(d.habitat)}.`,
    problem: (d) => `A message appeared in the sky: <strong>GRAVITY IS ON VACATION AT ${esc(d.place.toUpperCase())}.</strong> Unless someone convinced it to return, everything would float into space in exactly ${word(d.number)} hours.`,
    journey: (d) => `${word(d.creatureName)} tied itself to a ${word(d.sillyObject)} and bounced from cloud to cloud while nearby citizens tried ${word(d.verbIng)} as a method of steering.`,
    hardwareIntro: "At the edge of the atmosphere,",
    response: (d) => `The response pointed toward a small island in the sky. Gravity was relaxing there in sunglasses, sipping ${word(d.food)}, and refusing to discuss work.`,
    ability: (d) => `land on the island and demonstrate that the world needed gravity for important things such as walking, pouring drinks, and keeping ${word(d.animal)}s out of ceiling fans.`,
    showdown: (d) => `Gravity agreed to return if ${word(d.creatureName)} could provide one truly ${word(d.adjective)} vacation souvenir. The creature offered the emergency ${word(d.sillyObject)}. “${word(d.exclamation)}” said Gravity. “I have always wanted one of those.”`,
    ending: (d) => `Gravity switched back on gently. Everything returned to the ground, except one ${word(d.object)} that remained in orbit for decoration. ${word(d.creatureName)} finished breakfast and kept both feet firmly on the floor.`
  }
];

templates.push(...libraryBlueprints.map(makeLibraryStory));
document.querySelector(".library-note strong").textContent = `${templates.length} solo adventures`;

function chooseTemplate() {
  let next = Math.floor(Math.random() * templates.length);
  if (templates.length > 1) {
    while (next === lastTemplateIndex) next = Math.floor(Math.random() * templates.length);
  }
  lastTemplateIndex = next;
  return templates[next];
}

function renderStory() {
  const details = creatureDetails();
  const story = chooseTemplate()(details);
  storyTitle.textContent = story.title;
  storyOutput.innerHTML = `<h3>${esc(story.title)}</h3>${story.paragraphs.map((p) => `<p>${p}</p>`).join("")}`;
  storySection.hidden = false;
  storySection.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => storyOutput.focus({ preventScroll: true }), 450);
}

function wrapCanvasText(ctx, text, maxWidth) {
  const lines = [];
  String(text).split(/\n+/).forEach((paragraph) => {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;
    let line = words.shift();
    words.forEach((nextWord) => {
      const test = `${line} ${nextWord}`;
      if (ctx.measureText(test).width <= maxWidth) line = test;
      else {
        lines.push(line);
        line = nextWord;
      }
    });
    lines.push(line);
  });
  return lines;
}

function concatBytes(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  parts.forEach((part) => {
    result.set(part, offset);
    offset += part.length;
  });
  return result;
}

function dataUrlBytes(dataUrl) {
  const binary = atob(dataUrl.split(",")[1]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function canvasesToPdf(canvases) {
  const encoder = new TextEncoder();
  const encode = (text) => encoder.encode(text);
  const objectCount = 2 + canvases.length * 3;
  const objects = new Array(objectCount + 1);
  const pageRefs = [];

  canvases.forEach((canvas, index) => {
    const pageNumber = 3 + index * 3;
    const contentNumber = pageNumber + 1;
    const imageNumber = pageNumber + 2;
    const imageName = `Im${index + 1}`;
    const jpeg = dataUrlBytes(canvas.toDataURL("image/jpeg", 0.9));
    const content = `q\n612 0 0 792 0 0 cm\n/${imageName} Do\nQ`;
    const contentBytes = encode(content);

    pageRefs.push(`${pageNumber} 0 R`);
    objects[pageNumber] = encode(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /${imageName} ${imageNumber} 0 R >> >> /Contents ${contentNumber} 0 R >>`);
    objects[contentNumber] = concatBytes([
      encode(`<< /Length ${contentBytes.length} >>\nstream\n`), contentBytes, encode("\nendstream")
    ]);
    objects[imageNumber] = concatBytes([
      encode(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`),
      jpeg,
      encode("\nendstream")
    ]);
  });

  objects[1] = encode("<< /Type /Catalog /Pages 2 0 R >>");
  objects[2] = encode(`<< /Type /Pages /Kids [${pageRefs.join(" ")}] /Count ${canvases.length} >>`);

  const header = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]);
  const chunks = [header];
  const offsets = new Array(objectCount + 1).fill(0);
  let byteOffset = header.length;

  for (let number = 1; number <= objectCount; number += 1) {
    const prefix = encode(`${number} 0 obj\n`);
    const suffix = encode("\nendobj\n");
    offsets[number] = byteOffset;
    chunks.push(prefix, objects[number], suffix);
    byteOffset += prefix.length + objects[number].length + suffix.length;
  }

  const xrefOffset = byteOffset;
  let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let number = 1; number <= objectCount; number += 1) {
    xref += `${String(offsets[number]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  chunks.push(encode(xref));
  return new Blob(chunks, { type: "application/pdf" });
}

function loadPdfLogo() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = "assets/creature-studio-logo.png";
  });
}

async function downloadStoryPdf() {
  const pdfButton = document.querySelector("#pdf-button");
  const originalLabel = pdfButton.textContent;
  pdfButton.disabled = true;
  pdfButton.textContent = "Building your PDF…";

  try {
    const logo = await loadPdfLogo();
    const PAGE_WIDTH = 1224;
    const PAGE_HEIGHT = 1584;
    const LEFT = 104;
    const RIGHT = 104;
    const TOP = 174;
    const BOTTOM = 130;
    const CONTENT_WIDTH = PAGE_WIDTH - LEFT - RIGHT;
    const TEAL = "#007c80";
    const DEEP_TEAL = "#005c60";
    const ORANGE = "#a95100";
    const CHARCOAL = "#252525";
    const pages = [];
    let current;

    function roundedRectPath(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, width, height, radius);
      else ctx.rect(x, y, width, height);
    }

    function addPage() {
      const canvas = document.createElement("canvas");
      canvas.width = PAGE_WIDTH;
      canvas.height = PAGE_HEIGHT;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
      ctx.fillStyle = DEEP_TEAL;
      ctx.fillRect(0, 0, PAGE_WIDTH, 122);
      if (logo) ctx.drawImage(logo, 58, 15, 92, 92);
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 27px Arial, sans-serif";
      ctx.fillText("CREATURE STUDIO", 170, 52);
      ctx.font = "600 19px Arial, sans-serif";
      ctx.fillText("Solo Creature Adventure", 170, 84);
      current = { canvas, ctx, y: TOP };
      pages.push(current);
      return current;
    }

    function newContinuationPage() {
      addPage();
      current.ctx.fillStyle = DEEP_TEAL;
      current.ctx.font = "700 25px Arial, sans-serif";
      current.ctx.fillText(`${storyTitle.textContent} - continued`, LEFT, current.y);
      current.y += 52;
    }

    function ensureSpace(height) {
      if (current.y + height > PAGE_HEIGHT - BOTTOM) newContinuationPage();
    }

    function drawParagraph(text) {
      const ctx = current.ctx;
      ctx.font = "31px Georgia, 'Times New Roman', serif";
      const pdfText = String(text).replace(/[—–‑]/g, " - ");
      let lines = wrapCanvasText(ctx, pdfText, CONTENT_WIDTH);
      if (!lines.length) return;
      ensureSpace(Math.min(lines.length, 2) * 47 + 18);
      current.ctx.font = "31px Georgia, 'Times New Roman', serif";
      while (lines.length) {
        if (current.y + 47 > PAGE_HEIGHT - BOTTOM) {
          newContinuationPage();
          current.ctx.font = "31px Georgia, 'Times New Roman', serif";
        }
        const line = lines.shift();
        current.ctx.fillStyle = CHARCOAL;
        current.ctx.fillText(line, LEFT, current.y);
        current.y += 47;
      }
      current.y += 22;
    }

    function drawHardware(moment) {
      const intro = moment.querySelector(".hardware-intro")?.innerText.trim() || "The creature's program responded:";
      const steps = Array.from(moment.querySelectorAll(".hardware-step")).map((step) => ({
        label: step.querySelector("b")?.innerText.trim() || "",
        text: step.querySelector("span")?.innerText.trim() || ""
      }));
      const measure = document.createElement("canvas").getContext("2d");
      measure.font = "27px Arial, sans-serif";
      const measuredSteps = steps.map((step) => ({ ...step, lines: wrapCanvasText(measure, step.text, CONTENT_WIDTH - 190) }));
      const boxHeight = 82 + measuredSteps.reduce((sum, step) => sum + Math.max(58, step.lines.length * 39 + 12), 0);
      ensureSpace(boxHeight + 22);
      const ctx = current.ctx;
      const top = current.y;
      ctx.fillStyle = "#edf9f8";
      ctx.strokeStyle = DEEP_TEAL;
      ctx.lineWidth = 4;
      roundedRectPath(ctx, LEFT, top, CONTENT_WIDTH, boxHeight, 14);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#44595a";
      ctx.font = "italic 24px Arial, sans-serif";
      ctx.fillText(intro, LEFT + 30, top + 42);
      let y = top + 78;
      measuredSteps.forEach((step) => {
        const rowHeight = Math.max(58, step.lines.length * 39 + 12);
        ctx.fillStyle = DEEP_TEAL;
        roundedRectPath(ctx, LEFT + 30, y, 128, 42, 7);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 20px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(step.label, LEFT + 94, y + 28);
        ctx.textAlign = "left";
        ctx.fillStyle = step.label === "ACT" ? ORANGE : CHARCOAL;
        ctx.font = `${step.label === "ACT" ? "700" : "400"} 27px Arial, sans-serif`;
        step.lines.forEach((line, index) => ctx.fillText(line, LEFT + 185, y + 29 + index * 39));
        y += rowHeight;
      });
      current.y = top + boxHeight + 66;
    }

    addPage();
    current.ctx.fillStyle = DEEP_TEAL;
    current.ctx.font = "800 49px Arial, sans-serif";
    const titleLines = wrapCanvasText(current.ctx, storyTitle.textContent, CONTENT_WIDTH);
    titleLines.forEach((line) => {
      current.ctx.fillText(line, LEFT, current.y);
      current.y += 58;
    });
    current.y += 30;

    Array.from(storyOutput.children).slice(1).forEach((element) => {
      const hardware = element.querySelector(".hardware-moment");
      if (hardware) drawHardware(hardware);
      else drawParagraph(element.innerText.trim());
    });

    pages.forEach((page, index) => {
      const ctx = page.ctx;
      ctx.strokeStyle = "#007c80";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(LEFT, PAGE_HEIGHT - 82);
      ctx.lineTo(PAGE_WIDTH - RIGHT, PAGE_HEIGHT - 82);
      ctx.stroke();
      ctx.fillStyle = DEEP_TEAL;
      ctx.font = "700 18px Arial, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Creature Studio", LEFT, PAGE_HEIGHT - 45);
      ctx.textAlign = "center";
      ctx.fillText(`Page ${index + 1} of ${pages.length}`, PAGE_WIDTH / 2, PAGE_HEIGHT - 45);
      ctx.textAlign = "right";
      ctx.fillText("Facilitator: Mr. Umekubo", PAGE_WIDTH - RIGHT, PAGE_HEIGHT - 45);
      ctx.textAlign = "left";
    });

    const pdf = canvasesToPdf(pages.map((page) => page.canvas));
    const url = URL.createObjectURL(pdf);
    const link = document.createElement("a");
    const safeName = (document.querySelector("#creatureName").value || "Creature").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    link.href = url;
    link.download = `${safeName}-Solo-Adventure.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    pdfButton.textContent = "PDF downloaded!";
  } catch (error) {
    console.error(error);
    pdfButton.textContent = "PDF could not be created";
  } finally {
    window.setTimeout(() => {
      pdfButton.disabled = false;
      pdfButton.textContent = originalLabel;
    }, 2200);
  }
}

function validateForm() {
  const invalid = fieldIds.map((id) => document.querySelector(`#${id}`)).filter((field) => !field.checkValidity() || !field.value.trim());
  document.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
  if (!invalid.length) {
    formError.hidden = true;
    return true;
  }
  invalid.forEach((field) => field.classList.add("invalid"));
  formError.textContent = `Almost there—please complete ${invalid.length} highlighted ${invalid.length === 1 ? "box" : "boxes"}.`;
  formError.hidden = false;
  invalid[0].focus();
  return false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) renderStory();
});

document.querySelector("#surprise-button").addEventListener("click", () => {
  Object.entries(surpriseWords).forEach(([id, choices]) => {
    document.querySelector(`#${id}`).value = pick(choices);
    document.querySelector(`#${id}`).classList.remove("invalid");
  });
});

document.querySelector("#reroll-button").addEventListener("click", renderStory);
document.querySelector("#edit-button").addEventListener("click", () => {
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#creatureName").focus({ preventScroll: true });
});

document.querySelector("#copy-button").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(`${storyTitle.textContent}\n\n${storyOutput.innerText.replace(storyTitle.textContent, "").trim()}`);
    button.textContent = "Copied!";
  } catch {
    button.textContent = "Select text to copy";
  }
  window.setTimeout(() => { button.textContent = "Copy"; }, 1800);
});

document.querySelector("#print-button").addEventListener("click", () => window.print());
document.querySelector("#pdf-button").addEventListener("click", downloadStoryPdf);

fieldIds.forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", (event) => event.currentTarget.classList.remove("invalid"));
});
