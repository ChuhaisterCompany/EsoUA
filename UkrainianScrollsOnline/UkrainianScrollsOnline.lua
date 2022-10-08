local UkrainianScrollsOnline = {}
UkrainianScrollsOnline.name  = "Ukrainian Scrolls Online"
UkrainianScrollsOnline.version = "1.26"
UkrainianScrollsOnline.langString = nil
UkrainianScrollsOnline.positionning = false
UkrainianScrollsOnline.Flags = { "en", "ua", "ut"}

UkrainianScrollsOnline.defaults = {
	Enable	= true,
	anchor	= {BOTTOMRIGHT, BOTTOMRIGHT, 0, 7},
	Flags = {
		["en"]	= true,
		["ua"]	= true,
		["ut"]	= true,
	}
}
UkrainianScrollsOnline.settings = UkrainianScrollsOnline.defaults

local confirmDialog = {
    title = { text = zo_iconFormat("UkrainianScrollsOnline/images/".."es.dds", 24, 24).." Ukrainian Scrolls Online "..zo_iconFormat("UkrainianScrollsOnline/images/".."es.dds", 24, 24)},
    mainText = { text = "Наша команда щиро вдячна вам, за те що ви встановили EsoUA! \n\nДля того, щоб активувати український переклад, тицьніть спочатку на кнопку “ESC” та зверніть увагу на правий нижній кут вашого екрана. \n\nЩоб інтерфейс користувача почав перезавантажуватись тицьніть на прапорець України! \n\n— w2unemdhysend " },
    buttons = {
        { text = SI_DIALOG_ACCEPT, callback = functionToCall},
    }
}
ZO_Dialogs_RegisterCustomDialog("ADDON_DIALOG", confirmDialog )

if GetCVar("IgnorePatcherLanguageSetting") == "0" then
	ZO_Dialogs_ShowDialog("ADDON_DIALOG")
end

function UkrainianScrollsOnline_ChangeLanguage(lang)
  if lang ~= GetCVar("language.2") then
    if lang == "en" then
      SetCVar("IgnorePatcherLanguageSetting", 0)
    else
      SetCVar("IgnorePatcherLanguageSetting", 1)
    end
    SetCVar("language.2", lang)
  end
end

function UkrainianScrollsOnline:RefreshUI()
	local flagControl
	local count = 0
	local flagTexture
	for _, flagCode in pairs(UkrainianScrollsOnline.Flags) do
		flagTexture = "UkrainianScrollsOnline/images/"..flagCode..".dds"
		flagControl = GetControl("UkrainianScrollsOnline_FlagControl_"..tostring(flagCode))
		if flagControl == nil then
			flagControl = CreateControlFromVirtual("UkrainianScrollsOnline_FlagControl_", UkrainianScrollsOnlineUI, "UkrainianScrollsOnline_FlagControl", tostring(flagCode))
			if flagControl:GetHandler("OnMouseDown") == nil then flagControl:SetHandler("OnMouseDown", function() UkrainianScrollsOnline_ChangeLanguage(flagCode) end) end
			GetControl("UkrainianScrollsOnline_FlagControl_"..flagCode.."Texture"):SetTexture(flagTexture)
		end
		if UkrainianScrollsOnline.settings.Flags[flagCode] then
			flagControl:ClearAnchors()
			flagControl:SetAnchor(LEFT, UkrainianScrollsOnlineUI, LEFT, 14 +count*34, 0)
			count = count +1
		end
		flagControl:SetMouseEnabled(true)
		flagControl:SetHidden(not UkrainianScrollsOnline.settings.Flags[flagCode])
	end
	UkrainianScrollsOnlineUI:SetDimensions(25 +count*34, 50)
	UkrainianScrollsOnlineUI:SetMouseEnabled(true)

end

function UkrainianScrollsOnline_Selected()
	local isValidAnchor, point, relativeTo, relativePoint, offsetX, offsetY, anchorConstrains = UkrainianScrollsOnlineUI:GetAnchor()
	if isValidAnchor then
		UkrainianScrollsOnline.settings.anchor = { point, relativePoint, offsetX, offsetY }
	end
end

function UkrainianScrollsOnline:OnInit(eventCode, addOnName)
	UkrainianScrollsOnline.langString = GetCVar("language.2")
	UkrainianScrollsOnline.settings = ZO_SavedVars:NewAccountWide("UkrainianScrollsOnline_settings", 1, nil, UkrainianScrollsOnline.defaults)

	for _, flagCode in pairs(UkrainianScrollsOnline.Flags) do
		ZO_CreateStringId("SI_BINDING_NAME_"..string.upper(flagCode), string.upper(flagCode))
	end

	UkrainianScrollsOnline:RefreshUI()
	UkrainianScrollsOnlineUI:ClearAnchors()
	UkrainianScrollsOnlineUI:SetAnchor(UkrainianScrollsOnline.settings.anchor[1], GuiRoot, UkrainianScrollsOnline.settings.anchor[2], UkrainianScrollsOnline.settings.anchor[3], UkrainianScrollsOnline.settings.anchor[4])
	UkrainianScrollsOnline:registerEvents(true)

	EVENT_MANAGER:UnregisterForEvent(UkrainianScrollsOnline.name, EVENT_ADD_ON_LOADED)
end

function UkrainianScrollsOnline:registerEvents(state)
	if state then
		EVENT_MANAGER:RegisterForEvent(UkrainianScrollsOnline.name, EVENT_RETICLE_HIDDEN_UPDATE, function(eventCode, hidden) if UkrainianScrollsOnline.settings.Enable then UkrainianScrollsOnlineUI:SetHidden(not hidden) end end)
	else
		EVENT_MANAGER:UnregisterForEvent(UkrainianScrollsOnline.name, EVENT_RETICLE_HIDDEN_UPDATE)
	end
end

EVENT_MANAGER:RegisterForEvent(UkrainianScrollsOnline.name, EVENT_ADD_ON_LOADED , function(_event, _name) UkrainianScrollsOnline:OnInit(_event, _name) end)