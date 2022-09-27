import { Collection } from "discord.js";
import { CommandFilerType, general, message_command, modal, slachcmd, user_command, buttons_type, select_menu_type } from "./../handler/command"
export let collection = () => {
    return {
        user_commands: new Collection<string, user_command>(),
        slash_commands: new Collection<string, slachcmd>(),
        message_commands: new Collection<string, message_command>(),
        prefix_command: new Collection<string, general>(),
        modals: new Collection<string, modal>(),
        buttons: new Collection<string, buttons_type>(),
        events: new Collection<string, Promise<void>>(),
        select_menu: new Collection<string, select_menu_type>()
    }
}