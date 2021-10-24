const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {General_functions} = require("../helper_functions/general.js")
const {Alerts_general} = require("../alerts/general.js")
const {Embed_functions} = require('../helper_functions/embeds.js')

async function my_alerts(interaction, type = false) {
	let alerts = await Alerts_general.get_users_alerts(interaction.user.id)

	let fields = []
	if (alerts.length === 0) {
		fields.push( { name: 'Your alerts', value: "You haven't set any alerts." } )
	} else {
		let field1 = ""
		let index = 0
		for (let alert of alerts) {
			index += 1
			if (alert.alert.type === "stocks.reach") {
				let alert_string = await alert.to_string()
				field1 += "**" + index + ".** " + alert_string + "\n"
			}
		}
		fields.push( { name: 'Will ping you when:', value: field1, inline: true } )
	}
	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle("Your alerts")
		.setDescription( "Set new alerts with `/new-alert` and delete them with `/delete-alert`" )
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '')

	let to_reply = await Embed_functions.check_reply({ embeds: [embed] }, interaction, fields = 6, new_lines_limit=4)
	
	return to_reply
}


exports.my_alerts = my_alerts;

/*
{
	   "code": code,
		"alert": {
			"type": "stocks.reach",
			"stock": stock,
			"higher_or_lower": higher_or_lower,
			"property": property,
			"value": value
		},
		"owner": owner,
		"to_ping": to_ping,
		"channel": channel
	}
	*/