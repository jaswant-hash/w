from lxml import etree

xml = etree.parse("courses.xml")
xsl = etree.parse("courses.xsl")

transform = etree.XSLT(xsl)
result = transform(xml)

with open("output.html", "wb") as f:
    f.write(etree.tostring(result, method="html", pretty_print=True))

print("output.html created")