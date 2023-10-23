import {
  ageAdjectives,
  appearanceAdjectives,
  buildAdjectives,
  femaleNames,
  genders,
  maleNames,
} from "./traits";

enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "nonBinary",
}

enum Attribute {
  Gender = "Gender",
  FullName = "FullName",
  Race = "Race",
  Appearance = "Appearance",
  Age = "Age",
  Build = "Build",
}

type NPC = {
  gender?: string;
  name?: string;
  surname?: string;
  race?: string;
  appearance?: string;
  age?: string;
  build?: string;
  description?: string;
  nameRarity?: "Common" | "Epic";
};

export const npcFactory = (): NPC => {
  const npc: NPC = {};
  Object.values(Attribute).forEach((attr) => setAttribute(npc, attr));
  npc[
    "description"
  ] = `${npc.name} ${npc.surname} is a ${npc.appearance} and ${npc.build} ${npc.age} ${npc.gender} ${npc.race}`;
  return npc;
};

const getRandomEntry = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const setAttribute = (npc: NPC, attribute: Attribute) => {
  switch (attribute) {
    case Attribute.Gender:
      npc.gender = getRandomEntry(genders);
      return;
    case Attribute.FullName:
      const rareName = Math.random() <= 0.015;

      if (npc.gender === Gender.Male) {
        npc.name = rareName ? "Oswald" : getRandomEntry(maleNames);
        npc.surname = rareName ? "Louis" : getRandomEntry(maleNames);
        return;
      }

      if (npc.gender === Gender.Female) {
        npc.name = rareName ? "Karinne" : getRandomEntry(femaleNames);
        npc.surname = rareName ? "Nunes" : getRandomEntry(femaleNames);
        return;
      }

      const names = [maleNames, femaleNames];
      npc.name = getRandomEntry(getRandomEntry(names));
      npc.surname = getRandomEntry(getRandomEntry(names));
      return;
    case Attribute.Race:
      npc.race = "Human";
      return;
    case Attribute.Appearance:
      npc.appearance = getRandomEntry(appearanceAdjectives);
      return;
    case Attribute.Age:
      npc.age = getRandomEntry(ageAdjectives);
      return;
    case Attribute.Build:
      npc.build = getRandomEntry(buildAdjectives);
      return;
  }
};
