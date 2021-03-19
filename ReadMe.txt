ROBOT NOTES:

=====> LINKS:

	the spreadsheet https://docs.google.com/spreadsheets/d/14TXMDzZkfL3mTpIjvksJIMLdS3f7xjeLOFpIGviCEMk/edit#gid=94843435

	https://youtu.be/rRgD1yVwIvE
	https://anydice.com/
	https://youtu.be/MfxBfRD0FVU  - inheritance in JS
	http://www.electronicsteacher.com/robotics/robotics-technology/
	https://www.valentinog.com/blog/html-table/
	https://medium.com/@bretcameron/how-to-build-a-web-scraper-using-javascript-11d7cd9f77f2


=====> TO DO:

	*DO THIS NEXT*
		
		Salvage
			add soldering iron
			re-add misc

		Assembly 
			restructure assemblies
				readd to salvaging
			styles to terminal / overhaul messages
			ads should work on all pages

		Repairs

	
	more ads
		Cherry ad slots
		
	expanding	
		achievements
		modifiers

	handle compromises:
		underscore in table names

RESEARCH:

	local db
	map & weather
	canvas
	mobile
	logins
	
ADS SECTION:
	A small side art project. Homebrew ads. 
		link to other pages
		slots mechanism using atomic cherry ad
			TODO: allow atomic cherry to duplicate (browser alert)

		8 bit ads - 
		wigabits, ads for lots, ecma, airadio
		quick tiger drawings to start. imgs
		kennedy miles

		"for a better morning"	
		"PRO"
		"HOT"
		"You're Worth X"
		"X is forever"
		"Save X"
		"Every Little Bit"
		"Advancement"
		"Through Technology"
		"We are There"
		"Accelerate Yesterday"
		"subassembly surprise!" chicken

CSS: 
	  mobile
	  tigers bots
	  pages tidy

JS:

Assemblies:
	are groups of items
	randomized ones should be built from randomized parts
	to JSON and back

ROBOTS: 	

	robot categories: 
		scavengers
		builders
		combat
		assemblers
		dissemblers
		transportation unit (default = bus)
		animals mod
		add on modules
		misc


FUTURE:

	rare find! (Pinball surprisement!)
	Catalog
	Teeth - Shady Fellow
	
	Random breakage.
	psychic paper (esp badge) - get into lots free or early
	integrate local weather?

	new lots:
	
	"Tinnery Shred"
	"Steel Building"
	"River City Pic N Pull"
	"Coal Gas Kingdom"
	"Bridgewater"
	"Roy's Premium"


PAGES:

Salvage page - 3 div
	table representing item list and player quantity (left div)
	salvage buttons (center div) 
	assembly buttons (center div) 
	terminal (right div - top)
	city map / local weather (right div - bottom)

Assembly page - 2 divs
	table representing inventory, quantity, item "health", assemblies (left div)
		https://mdn.github.io/learning-area/html/tables/assessment-finished/planets-data.html
	smaller right div with terminal output and buttons for:
		disassembly
		
Repairs page - 


Reference page -

Notes -
	

assembly:
	displays table of user items: Id, Item_name, and health

	second column contains radio buttons for all sub assemblies.

		when selected:
			the submit button will be enabled
			the debug box will display information about the part
			the space below the submit button will populate 
				with list of ingredients for selected item 
				users actual inventory of each ingredient presented as radio buttons

		The user should be able to select the ingredients from their inventory
		in this way and on clicking the submit button, the items will be 
		pulled from the inventory and grouped into the assembly with name and 
		health being automatically calculated.

	do completed subassemblies belong in this inventory table?

	how to generate ids for subassemblies 
		use tracking in LS. starts with s; "S1", "S2", etc.

	health - uses the avg of the ingredients. wear and tear happens to the ingredients.

================================================================

	JavaScript supports different kinds of loops:

for - loops through a block of code a number of times
for/in - loops through the properties of an object
for/of - loops through the values of an iterable object
while - loops through a block of code while a specified condition is true
do/while - also loops through a block of code while a specified condition is true