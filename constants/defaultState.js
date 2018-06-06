import Immutable from 'immutable';

export default {
  text: {
    selectedId: 1,

    entities: [
      {
        id: 0,
        typed: '',
        last: 'Test text',
      },
      {
        id: 1,
        typed: 'Dolphins are a widely distributed and diverse group of aquatic mammals. They are an informal grouping within the order Cetacea, excluding whales and porpoises, so to zoologists the grouping is paraphyletic. The dolphins comprise the extant families Delphinidae (the oceanic dolphins), Platanistidae (the Indian river dolphins), Iniidae (the new world river dolphins), and Pontoporiidae (the brackish dolphins), and the extinct Lipotidae (baiji or Chinese river dolphin). There are 40 extant species of dolphins. Dolphins, alongside other cetaceans, belong to the clade Cetartiodactyla with even-toed ungulates. Cetaceans\' closest living relatives are the hippopotamuses, having diverged about 40 million years ago. Dolphins range in size from the 1.7 m (5.6 ft) long and 50 kg (110 lb) Maui\'s dolphin to the 9.5 m (31 ft) and 10 t (11 short tons) killer whale. Several species exhibit sexual dimorphism, in that the males are larger than females. They have streamlined bodies and two limbs that are modified into flippers. Though not quite as flexible as seals, some dolphins can travel at 55.5 km/h (34.5 mph). Dolphins use their conical shaped teeth to capture fast moving prey. They have well-developed hearing which is adapted for both air and water and is so well developed that some can survive even if they are blind. Some species are well adapted for diving to great depths. They have a layer of fat, or blubber, under the skin to keep warm in the cold water. Although dolphins are widespread, most species prefer the warmer waters of the tropic zones, but some, like the right whale dolphin, prefer colder climates. Dolphins feed largely on fish and squid, but a few, like the killer whale, feed on large mammals, like seals. Male dolphins typically mate with multiple females every year, but females only mate every two to three years. Calves are typically born in the spring and summer months and females bear all the responsibility for raising them. Mothers of some species fast and nurse their young for a relatively long period of time. Dolphins produce a variety of vocalizations, usually in the form of clicks and whistles.  Dolphins are sometimes hunted in places like Japan, in an activity known as dolphin drive hunting. Besides drive hunting, they also face threats from bycatch, habitat loss, and marine pollution. Dolphins have been depicted in various cultures worldwide. D',
        last: 'olphins occasionally feature in literature and film, as in the film series Free Willy. Dolphins are sometimes kept in captivity and trained to perform tricks. The most common dolphin species kept is the bottlenose dolphin, while there are around 60 captive killer whales.',
      },
    ],
  },
  learning: {
    // fingers, free,
    mode: 'fingers',

    lesson: {
      typed: '',
      rest: '',
    },

    fingers: {
      maxLettersInWord: 5,
      setSize: 5,
      example: '',
    },

    free: {
      maxLettersInWord: 5,
      letters: Immutable.Set([]),
      example: '',
    },
  },
};
