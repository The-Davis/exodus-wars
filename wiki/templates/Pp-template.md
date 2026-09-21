---
title: "Pp-template"
page_id: 22
namespace: 10
namespace_name: "Template"
latest_revision_id: 43
last_updated: "2007-07-08 09:05:59"
author: "Asears"
is_redirect: false
categories:
  - "Protected_templates"
  - "Protection_templates"
templates:
  - "Howtoedit"
  - "In_category"
  - "Pp-template"
  - "Protection_templates"
  - "Tlx"
---

<noinclude>{{pp-template|small=yes}}
</noinclude>{{#ifeq:{{{small|}}}{{{expiry|ʁ}}}|yesʁ
|
<div style="position:absolute; z-index:100; right:20px; top:10px; height:10px; width:300px;"></div>
<div style="position:absolute; z-index:100; right:10px; top:10px;" class="metadata" id="administrator">
<imagemap>
 Image:Padlock.svg|20px
 default [[Wikipedia:Protection policy|This high-risk template or image included in one has been protected from editing to prevent vandalism]]
 desc none
</imagemap>
</div>
|
<table class="messagebox protected" style="border:2px solid #99B; padding:0px; font-size:0.9em;">
<tr>
<td valign="middle" > [[Image:Padlock.svg|45px| ]]</td>
<td>
'''This {{#switch:{{NAMESPACE}}
  |{{ns:image}}=image, used in one or more [[Wikipedia:High-risk templates|high-risk templates]] and/or [[Special:Allmessages|system messages]],
  |#default=[[Wikipedia:High-risk templates|high-risk template]]
}} has been [[Wikipedia:This page is protected|protected]] from editing to prevent [[Wikipedia:vandalism|vandalism]].''' <span class="plainlinks">([{{fullurl:Special:Log|type=protect&page={{FULLPAGENAMEE}}}} protection log]).</span> {{howtoedit}}
{{#switch:{{NAMESPACE}}|{{ns:image}}=<small>'''Do not move this image''' to [[commons:|Wikimedia Commons]].</small>}}
</td>
</tr>
</table>
}}<includeonly>[[Category:Protected templates|{{PAGENAME}}]]</includeonly><noinclude>

----
* Use {{tlx|{{lc:{{PAGENAME}}}}}} for the normal template
* Use {{tlx|{{lc:{{PAGENAME}}}}|small&#61;yes}} for just an icon at the top

This template is not to be used as a bluff. '''''Only use it on FULLY PROTECTED pages.''''' Please note that only [[Wikipedia:Administrators|administrators]] can protect pages.

{{protection templates}}

{{in category|Protected templates}}
[[Category:Protection templates|{{PAGENAME}}]]
</noinclude>