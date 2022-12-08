const starshipInfo = {
  name: 'The name of this starship. The common name, such as "Death Star".',
  model:
    'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".',
  starship_class:
    'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"',
  manufacturer:
    "The manufacturer of this starship. Comma separated if more than one.",
  cost_in_credits: "The cost of this starship new, in galactic credits.",
  length: "The length of this starship in meters.",
  crew: "The number of personnel needed to run or pilot this starship.",
  passengers: "The number of non-essential people this starship can transport.",
  max_atmosphering_speed:
    'The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.',
  hyperdrive_rating: "The class of this starships hyperdrive.",
  MGLT: 'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.',
  cargo_capacity:
    "The maximum number of kilograms that this starship can transport.",
  consumables:
    "The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.",
  films: "An array of Film URL Resources that this starship has appeared in.",
  pilots:
    "An array of People URL Resources that this starship has been piloted by.",
  url: "the hypermedia URL of this resource.",
  created:
    "the ISO 8601 date format of the time that this resource was created.",
  edited: "the ISO 8601 date format of the time that this resource was edited."
};

export default starshipInfo;
