import React from 'react';
import Panel from '../Panel/Panel';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const FooterRow = ({ heading, children }) => (
    <Box>
        <Typography variant='h3'>{heading}</Typography>
        {children}
    </Box>
);

const Download = ({ cityName, dwBase, dwSlug, ghBase, csvFn }) => {
    const dlLink = <Link href={`https://query.data.world/s/${dwSlug}`}>Download</Link>;
    const dwLink = <Link href={dwBase}>data.world</Link>;
    const ghLink = <Link href={`${ghBase}/${csvFn}`}>GitHub</Link>;
    return (
        <FooterRow heading='Download data'>
            <Typography>
                {dlLink} {`${cityName}`} neighborhood data (.csv file),
                filter and analyze data online on {dwLink} (requires free sign-up),
                or download / clone from {ghLink} (advanced users).
            </Typography>
        </FooterRow>
    );
};

const Geography = ({ geography }) => {
    return (
        <FooterRow heading='Geography'>
            <Typography>
                Neighborhood boundaries are created by DataHaven based on consultations with municipal government about current designations.
            </Typography>
            {geography && <Typography>
                {`${geography.region} is defined as ${geography.def}.`}
            </Typography>}
        </FooterRow>
    );
};

const Sources = ({ sources }) => {
    return (
        <FooterRow heading='Source: DataHaven analysis (2024) of:'>
            <ul style={{ margin: 0 }}>
                {sources.map((source, i) => (
                    <Source key={i} {...source} />
                ))}
            </ul>
        </FooterRow>
    );
};

const Source = ({ project, source, url, year }) => {
    return (
        <li>
            <strong>{`${source} `}</strong>
            {`(${year}). `}
            <Link href={url}>{`${project}`}</Link>
        </li>
    );
};



const Footer = ({ city, cityName, dwBase, ghBase, csvFn, dwSlug, geography, sources }) => {
    return (
        <Panel heading={`Notes`}>
            <Stack direction='column' 
                spacing={1}
                divider={<Divider aria-hidden='true' variant='middle' />}
                sx={{
                    m: 1,
                }}
            >
                <Download
                    cityName={cityName}
                    dwBase={dwBase}
                    ghBase={ghBase}
                    csvFn={csvFn}
                    dwSlug={dwSlug}
                />

                <Geography geography={geography} />

                <Sources sources={sources} />
            </Stack>
        </Panel>
    )
};

export default Footer;
